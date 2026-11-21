# Northstar Studio — Next.js / TypeScript portfolio

A bespoke, responsive digital-product portfolio built with **Next.js App Router**, **TypeScript**, **React**, **Lucide**, and original CSS. This replaces an earlier static HTML prototype.

## Four interactive showcases
- **Meridian CRM:** Editable sales opportunities, stage transitions, totals, search, CSV export, browser-local persistence.
- **Mellow Support:** Searchable knowledge-based chat, add articles, honest escalation for unsupported questions.
- **Sorelle Restaurant:** Menu and localized headline, date/time/party form, simulated capacity-aware reservations.
- **Flowstate Automation:** Upload CSV (max 2 MB), trim whitespace, remove empty and duplicate rows, export cleaned CSV.

All demos are **browser-only prototypes**. No real accounts, businesses, restaurants or AI model are connected. Data in CRM, support and booking is stored using localStorage, not a server. Never enter personal data into a public demo.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000. For production, run `npm run build` then `npm start`.

## Deploy
Import this repository into Vercel, choose Next.js, root directory `./`, deploy main. Deployment requires npm registry access. Do **not** use GitHub Pages for this non-exported Next.js application.

## Originality & attribution
The design, page composition and interactive demos in this repository are custom-authored, not a third-party portfolio template. Icons: Lucide (ISC license). Do not represent demo use cases as paid client engagements. See LICENSE.
