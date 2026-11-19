# Harvico

Harvico is a website for an agricultural marketplace in Kenya, connecting farmers with buyers and wholesalers. It introduces the platform, explains its mission, answers common questions, and helps visitors contact the team.

**GitHub repository description:** A Kenya-focused agricultural marketplace connecting farmers, buyers, and wholesalers.

## Pages

- `/` — Home and marketplace overview
- `/about` — Harvico’s story, vision, and mission
- `/help` — Frequently asked questions
- `/contact` — Contact details and an email-draft form

## Built with

- React 19
- Vite 8
- Plain CSS

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal (usually `http://localhost:5173`).

## Build

Create the production site in `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy to Vercel

Import the repository into Vercel and use the Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` rewrites page requests to `index.html`, so direct visits and refreshes on routes such as `/about` work with this single-page app.

## Contact

- General enquiries: [info@harvico.co.ke](mailto:info@harvico.co.ke)
- App support: [harvico.support@harvico.co.ke](mailto:harvico.support@harvico.co.ke)

The contact form opens a prefilled email in the visitor’s email app; it does not send messages directly from the website.
