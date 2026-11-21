# Northstar Studio — interactive web studio portfolio

An original premium, responsive **Next.js 15 / React 19 / TypeScript** portfolio that showcases four functional product demos. The site has editorial typography, animated details, glassmorphism, accessible responsive interactions, and a real serverless API.

## Production
[Live deployment](https://northstar-portfolio-studio.vercel.app/) · [Vercel dashboard](https://vercel.com/kargona/northstar-portfolio-studio)

## Interactive projects

| Project | UI | Backend |
| --- | --- | --- |
| Meridian CRM | Search, create, delete, stage progression, KPIs, CSV export | Private per-browser workspace persistence |
| Mellow Support | Knowledge-base chat, article editor, escalation fallback | Private per-browser article and chat persistence |
| Sorelle Restaurant | Seasonal menu, bilingual headline, availability checks, reservations | Private per-browser booking persistence (simulation) |
| Flowstate | CSV upload, row cleanup, deduplication, CSV export | Validated Next.js `POST /api/automation`, in-memory processing, max 100 KB |

### Technical architecture

- `app/page.tsx`: client-side UI and showcase state
- `app/globals.css` + `app/premium.css`: responsive design, editorial type, animations, glass effects and reduced-motion support
- `app/api/workspace/route.ts`: `GET/PUT /api/workspace?kind=deals|knowledge|chat|bookings`. Uses a secure, HttpOnly, SameSite session cookie scoped to each anonymous browser. Reads/writes private Vercel Blob objects; caps data size, validates schema, checks origin and applies best-effort per-instance request throttling.
- `app/api/automation/route.ts`: server-side CSV parsing and cleanup, no data retention.
- `@vercel/blob`: private store bound to the Vercel project with `BLOB_READ_WRITE_TOKEN` (never commit this token).
- `localStorage`: fallback cache for UI responsiveness when the storage API is unreachable.

This is a **public demonstration, not a production multi-tenant application**. Anonymous cookie sessions are not accounts. The sample restaurant is fictional, bookings are simulated and **not** shared globally across browsers. Support is retrieval-based, **not** a generative AI integration. Blob object storage is **not** a relational database; concurrent writes and billing limits must be addressed before customer deployment.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

For server-side workspace persistence, connect a **private Vercel Blob store** and set `BLOB_READ_WRITE_TOKEN` in your own environment. The frontend works using localStorage without a configured store. CSV processing requires the Next.js server.

```bash
npm run build
npm run start
```

## Security and cost
Never submit real customer or payment information to a public portfolio demo. Production needs real authentication/authorization, CSRF defense, distributed rate limiting, reliable database transactions and privacy/compliance review. Vercel Blob usage can incur costs based on the linked plan and usage.

## Originality
The portfolio and application showcase code is custom-authored. Fonts are Google Fonts; icons are Lucide (ISC license). The sample businesses, client records and revenue are fictional. Do not portray demos as paid client engagements.

License: MIT.
