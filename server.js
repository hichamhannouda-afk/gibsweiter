import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import pg from "pg";

const { Pool } = pg;

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true, // luego lo restringimos a tu dominio
});

await app.register(rateLimit, {
  max: 200,
  timeWindow: "1 minute",
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/health", async () => ({ ok: true }));

app.get("/db", async () => {
  const r = await pool.query("select now() as now");
  return r.rows[0];
});

// crea tabla básica si no existe (solo para arrancar)
app.post("/init", async () => {
  await pool.query(`
    create table if not exists listings (
      id bigserial primary key,
      title text not null,
      price_eur int,
      city text,
      created_at timestamptz not null default now()
    );
  `);
  return { ok: true };
});

app.get("/listings", async () => {
  const r = await pool.query(
    "select id,title,price_eur,city,created_at from listings order by created_at desc limit 50"
  );
  return r.rows;
});

app.post("/listings", async (req) => {
  const { title, price_eur, city } = req.body ?? {};
  if (!title || typeof title !== "string") {
    return app.httpErrors?.badRequest?.("title required") ?? { error: "title required" };
  }
  const r = await pool.query(
    "insert into listings (title, price_eur, city) values ($1,$2,$3) returning id",
    [title, price_eur ?? null, city ?? null]
  );
  return { ok: true, id: r.rows[0].id };
});

app.listen({ host: "0.0.0.0", port: Number(process.env.PORT || 3000) });
