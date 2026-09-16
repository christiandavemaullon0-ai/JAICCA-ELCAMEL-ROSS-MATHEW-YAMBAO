# Jaicca & Ross — Premium Wedding RSVP

A single-page wedding invitation built with React, Vite, Tailwind CSS, and Framer Motion. RSVP responses can be sent to Google Sheets through a Google Apps Script Web App.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`.

## Deploy to Vercel

### Option A — Git
1. Push this folder to GitHub, GitLab, Bitbucket, or Azure DevOps.
2. Import the repository into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_SHEETS_URL` in Project Settings → Environment Variables.
7. Deploy.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

## Google Sheets / Apps Script setup

1. Create a Google Sheet.
2. Rename the first tab to **RSVP Responses**.
3. Put these headers in row 1:
   `Timestamp | Name | Email | Guests | Attending | Message`
4. Create a second tab named **Guest List**.
5. Put `Name` in cell A1 and one invited guest per row starting at A2.
6. Open **Extensions → Apps Script**.
7. Replace the default script with `apps-script/Code.gs` from this project.
8. Click **Deploy → New deployment**.
9. Select **Web app**.
10. Execute as: **Me**.
11. Who has access: **Anyone**.
12. Deploy and copy the URL ending in `/exec`.
13. Create `.env` from `.env.example` and set:

```env
VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_USE_LIVE_GUEST_LIST=false
VITE_ENTRY_GATE_EVERY_VISIT=false
```

Restart `npm run dev` after changing environment variables.

### Why the RSVP POST uses `no-cors`

Google Apps Script Web Apps are often consumed cross-origin from static sites. The frontend sends the RSVP as JSON with `mode: "no-cors"` so the browser can transmit the request without requiring a CORS preflight. Because the browser receives an opaque response, the client can confirm that the request was sent but cannot inspect Apps Script's returned JSON. Google Sheets remains the source of truth for the saved response.

For strict server-acknowledged responses, put a same-origin Vercel serverless proxy in front of Apps Script and have the frontend call that proxy instead.

## Replace the hardcoded guest list with Google Sheets

The local fallback list lives in:

`src/data/guestList.js`

The Apps Script `doGet` already exposes the **Guest List** sheet when called with:

`?action=guest-list`

To enable it, set:

```env
VITE_USE_LIVE_GUEST_LIST=true
```

`src/utils/sheets.js` will fetch the guest list from Apps Script. If the fetch fails, the site safely falls back to the local hardcoded list.

> Privacy note: enabling this endpoint makes the guest-name list readable by anyone who can access the public Apps Script URL. For a private production list, validate names server-side instead of returning the entire list to the browser.

## Update ceremony and reception details

Edit:

`src/data/eventDetails.js`

No component changes are required.

## Entry gate behavior

By default, the invitation gate appears once per browser session using `sessionStorage`.

To force it to appear on every reload:

```env
VITE_ENTRY_GATE_EVERY_VISIT=true
```

## Music

The fixed music control uses the browser Web Audio API to generate a soft instrumental motif. It starts only after the guest taps/clicks the music button, which respects browser autoplay restrictions and avoids shipping an extra audio file.

## Project structure

```text
/wedding-invite
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
├── vercel.json
├── README.md
├── /public
│   ├── favicon.ico
│   └── /images
│       ├── envelope.svg
│       ├── floral-corner.svg
│       ├── floral-divider.svg
│       └── og-wedding.svg
├── /src
│   ├── main.jsx
│   ├── App.jsx
│   ├── /components
│   │   ├── EntryGate.jsx
│   │   ├── Hero.jsx
│   │   ├── Countdown.jsx
│   │   ├── Story.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Gallery.jsx
│   │   ├── RSVP.jsx
│   │   ├── GuestCheckerModal.jsx
│   │   ├── MusicToggle.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SectionReveal.jsx
│   │   └── NotFound.jsx
│   ├── /data
│   │   ├── guestList.js
│   │   └── eventDetails.js
│   ├── /utils
│   │   └── sheets.js
│   └── /styles
│       └── index.css
└── /apps-script
    └── Code.gs
```
