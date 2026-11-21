# Northstar Studio — Interactive Freelance Portfolio

An **original light-themed portfolio website** featuring four browser-based interactive demonstrations.

**Live website:** Enable GitHub Pages in **Settings → Pages → Deploy from a branch → main / (root)**. The published URL will be `https://akopyan0.github.io/Northstar---Portfolio/` after GitHub confirms deployment.

## Interactive showcase

| Project | Working features in the public website |
|---|---|
| **Pulse CRM** | Add and delete opportunities, update live totals, count won deals, save browser-local data, export CSV |
| **Kindred Support** | Ask questions, retrieve knowledge-base answers, add articles, fallback to human escalation |
| **Maison Olive** | Browse a sample menu and create capacity-checked, simulated table reservations |
| **Flow Automation** | Upload/paste CSV, trim fields, remove duplicate/blank rows, download cleaned CSV |

The website is **static and self-contained**; GitHub Pages needs no Python server, database, API keys or installation. This makes it safe and inexpensive to present the portfolio publicly.

## Preview locally
Open `index.html` in a modern browser. You can alternatively run `python -m http.server 8000` and visit `http://localhost:8000`.

## Technical notes
- HTML, CSS and vanilla JavaScript
- Responsive design and accessible form labels
- LocalStorage for browser-only CRM, knowledge-base and booking demonstration data
- File parsing and download happen entirely inside the browser
- Web font is served from Google Fonts
- No accounts, payments, actual restaurant reservations, real AI model or production CRM backend are implied

**Security & privacy:** This is a demonstration. Do not enter real personal or business data. Each visitor only sees their own browser-local data. The support agent is **retrieval-based, not a generative AI**.

## Full backend edition
A separate local FastAPI/SQLite edition provides multi-page demos, PDF/Excel/ZIP processing, and server-side data storage. It is deliberately **not** hosted publicly without authentication and upload protections. The publicly available site is a browser-safe showcase.

## Attribution
This site is an original Northstar Studio implementation. Do not misrepresent demo projects as paid client work. Keep notices for any third-party components introduced later.

## License
MIT. See `LICENSE`.
