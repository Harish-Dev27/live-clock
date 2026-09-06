# Live Clock

A simple React single-page application that displays live local time for India and Germany.

## Features

- Live clocks updated every second
- 12-hour time format with AM/PM
- Country-specific dates
- India and Germany flags
- Responsive desktop and mobile layout
- Flame cursor trail that appears only in empty page space

## Requirements

- Node.js 18 or newer
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

- `src/App.tsx` contains the clock data, live timer, and cursor trail.
- `src/App.css` contains the clock and flame trail styles.
- `src/index.css` contains global page styles.
- `public/` contains static assets.

## Time zones

The clocks use the browser's `Intl.DateTimeFormat` API with these IANA time zones:

- India: `Asia/Kolkata`
- Germany: `Europe/Berlin`

To add another location, add its country, flag, locale, and IANA time zone to the `timeZones` list in `src/App.tsx`.