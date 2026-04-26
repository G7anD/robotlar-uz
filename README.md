# Robotlar.uz

Robototexnika va sun'iy intellekt sohasidagi yangiliklar, robot katalogi va galereya — O'zbek tilida. Next.js 16 + React 19 + Tailwind v4 + Sanity CMS.

## Mahalliy ishga tushirish

```bash
npm install
cp .env.local.example .env.local   # qiymatlarni to'ldiring (pastga qarang)
npm run dev
```

`http://localhost:3000` ochiladi. Sanity Studio lokal: `http://localhost:3000/studio`.

## Sanity CMS sozlash

### 1. Loyiha yaratish

`https://www.sanity.io/manage` da yangi loyiha yarating yoki mavjud loyihani oching.

- **Project ID** ni nusxalang (masalan `abc123de`).
- **Dataset** odatda `production`.
- **API token** yarating: `Settings → API → Tokens → Add API token`. **Editor** yoki **Write** ruxsati kerak (seed va AI pipeline yozish uchun).

### 2. CORS sozlamasi

`Settings → API → CORS Origins` da quyidagi originlarni qo'shing:

- `http://localhost:3000` — `Allow credentials: true`
- `https://robotlar.uz` — `Allow credentials: true`
- Vercel preview URL (`https://*.vercel.app`) — kerak bo'lsa.

### 3. Env variables

`.env.local` (lokal) va Vercel `Project Settings → Environment Variables` (production):

| Var | Qiymat | Sirmi? |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123de` | yo'q |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | yo'q |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | yo'q |
| `SANITY_API_TOKEN` | Editor token | **ha** |
| `SANITY_REVALIDATE_SECRET` | Tasodifiy string (`openssl rand -hex 32`) | **ha** |

Vercel'da har bir env'ni `Production`, `Preview`, `Development` muhitlariga belgilang.

### 4. Schemalar va Studio'ni deploy qilish

Schemalar `src/sanity/schemaTypes/` da. Studio `/studio` route orqali ochiladi (Next.js ichida yashaydi). Ko'chirma Studio kerak emas — productionda `https://robotlar.uz/studio` ishlaydi.

### 5. Seed kontent yuklash

Lokal sozlovdan keyin:

```bash
npm run seed         # data.ts + awesome-robots (150) hammasini yuklaydi
npm run seed:data    # faqat data.ts (6 robot, 6 yangilik, 6 kategoriya)
npm run seed:awesome # faqat awesome-robot-descriptions katalogi
```

Yana yuklash uchun: `npm run seed:data -- --reset` (eski `seed.*` _id'larini o'chirib qayta yozadi).

Seed dokumentlari `seed.category.<slug>`, `seed.robot.<slug>`, `seed.news.<slug>`, `seed.aw.<slug>` _id'lariga ega — boshqa hujjatlarga tegmaydi.

### 6. Webhook bilan revalidation

Sanity → Vercel real-vaqt yangilanish uchun:

1. Sanity Studio: `Settings → API → Webhooks → Create webhook`.
2. **URL**: `https://robotlar.uz/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
3. **Dataset**: `production`
4. **Trigger on**: `Create`, `Update`, `Delete`
5. **Filter** (ixtiyoriy): `_type in ["robotProfile", "newsArticle", "category"]`
6. **HTTP method**: `POST`

## AI kontent pipeline

`scripts/pipeline/` mustaqil sub-paket. RSS o'qiydi, Claude orqali tahlil qiladi, Sanity'ga draft yangilik yozadi va Telegram'ga xabar beradi. Alohida env vars (`ANTHROPIC_API_KEY`, `SANITY_API_WRITE_TOKEN`, Telegram tokeni) talab qiladi. Cron'da ishlaydi (`.github/workflows/`).

## Texnik stack

- **Next.js 16** App Router (`src/app/`).
- **React 19**.
- **Tailwind v4** (`postcss.config.mjs`, `globals.css`).
- **Sanity v5** + `next-sanity` v12 — `/studio` embedded.
- **Vercel** hosting (`vercel.json`).

## Loyiha tuzilishi

```
src/
  app/                  Next.js App Router
    api/revalidate/     Sanity webhook qabul qiladi
    studio/[[...tool]]/ Sanity Studio
  components/           UI komponentlari
  lib/
    data.ts             Hardcoded fallback (legacy, seed manbasi sifatida ham)
    awesome-robots.ts   awesome-robot-descriptions katalogi (150 robot)
    sanity/             Client, queries, image helper
  sanity/
    schemaTypes/        author, category, newsArticle, robotProfile
    env.ts              Project ID/dataset readers
scripts/
  seed-sanity.mjs            data.ts → Sanity
  seed-awesome-robots.mjs    awesome-robots → Sanity
  pipeline/                  AI kontent pipeline (alohida)
sanity.config.ts        Studio konfiguratsiyasi
```

## Vercel'ga deploy

1. GitHub repo'ni Vercel'ga ulang (`vercel link`).
2. Yuqoridagi env variables ro'yxatini `Project Settings → Environment Variables` ga qo'shing.
3. Push qiling — har push avtomatik deploy bo'ladi.
4. Sanity webhook'ni production URL bilan sozlang (yuqoridagi 6-bo'lim).

## Skriptlar

| Buyruq | Tavsif |
|---|---|
| `npm run dev` | Lokal dev server |
| `npm run build` | Production build |
| `npm run start` | Build qilingan saytni ishga tushirish |
| `npm run lint` | ESLint |
| `npm run seed` | Sanity'ga hamma seed kontentni yuklash |
| `npm run seed:data` | data.ts seed |
| `npm run seed:awesome` | awesome-robots seed |
