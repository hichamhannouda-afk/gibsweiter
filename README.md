
# 🚀 GibsWeiter – Die lokale All-in-One Plattform

**GibsWeiter** ist eine moderne lokale Plattform nach dem Prinzip von eBay Kleinanzeigen, aber erweitert um:

- 🎁 Verschenken  
- 💶 Kaufen & Verkaufen  
- 🔨 Auktionen  
- ♻️ Wiederverwendung & Kreislaufwirtschaft  

**Ziel:**  
Die führende lokale Plattform in Deutschland für Wiederverwendung, Second-Hand und lokalen Handel zu werden.

---

## 🧱 Technologie-Stack

- Next.js  
- PostgreSQL  
- Prisma  
- Meilisearch (Sofortsuche)  
- NextAuth (Login)  
- Echtzeit-Chat  
- Schneller Bild-Upload  
- Mehrsprachig (Deutsch zuerst)

---

## ⚡ Lokale Installation (für Entwickler)

```bash
git clone https://github.com/hichamhannouda-afk/gibsweiter.git
cd gibsweiter
cp .env.example .env
docker-compose up -d
pnpm install   # oder npm install
pnpm db:push
pnpm seed
pnpm dev
Im Browser öffnen:

http://localhost:3000
