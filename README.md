# AWS Student Community Day Peshawar 2026

A modern, high-performance landing page and lightweight content management system for the AWS Student Community Day, hosted at FAST University (NUCES) Peshawar. Built to deliver a premium attendee experience with a neo-brutalist design, fast load times, and an in-browser admin panel for editing site content without touching code for day-to-day updates.

**Live URL:** [https://aws-community-day-2026-dusky.vercel.app](https://aws-community-day-2026-dusky.vercel.app)

## Features

- **Neo-Brutalist Design:** Bold typography, stark borders, and high-contrast color palettes.
- **Responsive Layout:** Flawless rendering across mobile, tablet, and desktop devices.
- **Smooth Scrolling:** Custom [Lenis](https://github.com/darkroomengineering/lenis) integration for a fluid browsing experience.
- **Scroll Animations:** Framer Motion reveal/stagger animations on Partners, Speakers, and Organizers sections.
- **Dynamic Content Sections:** Hero with live countdown, partner marquee, speaker grid, organizer fan-carousel, venue map (Leaflet), and FAQ.
- **Admin Panel ("CMS"):** Password-protected dashboard for editing hero copy, speakers, partners, organizers, venue details, FAQs, and site-wide settings — see [Admin Panel](#admin-panel) below for how content actually gets published.
- **Countdown Timer:** Live countdown to the event start, timezone-aware (`+05:00`).

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build/dev tooling)
- **Tailwind CSS v3.4** (styling)
- **React Router v7** (routing, incl. admin routes)
- **Framer Motion** + **GSAP** (animations)
- **Lenis** (smooth scroll)
- **Leaflet** / **react-leaflet** (venue map)
- **lucide-react** (icons)
- **oxlint** (linting)

## Getting Started

Requires Node.js (with npm).

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Navigate to `http://localhost:5173` to view the public site. The admin panel is available at `http://localhost:5173/admin/login`.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/`. |
| `npm run lint` | Run `oxlint` over the codebase. |
| `npm run preview` | Serve the production build locally. |

No environment variables are required — there is no backend and no `.env` file to configure.

## Project Structure

```
src/
├── admin/              # Admin ("CMS") panel — routes are nested under /admin
│   ├── components/     # AdminLayout, sidebar/topbar, modals, ProtectedRoute, Toast
│   ├── hooks/           # useAdminAuth — login/logout + auth state
│   └── pages/           # Dashboard, HeroEditor, SpeakersManager, PartnersManager,
│                        # OrganizersManager, FAQManager, VenueEditor, Settings, Login
├── components/          # Shared public-site UI (Navbar, NeoButton/Card/Input, carousels, marquee)
├── context/             # SiteDataContext — in-memory + localStorage-backed site content store
├── data/                # siteData.ts — the default/fallback content shown on first load
├── hooks/               # useCountdown
├── sections/             # Public-site page sections (Hero, Partners, Speakers, Organizers, Venue, FAQ, Footer)
└── App.tsx              # Routing: public site at "/", admin app under "/admin/*"
```

## Admin Panel

The site ships with a client-side admin panel at `/admin` for editing content (speakers, partners, organizers, FAQs, hero text, venue info, and settings like registration status and social links).

**Important — how content persistence actually works:** this project has no backend or database. All content lives in [`src/data/siteData.ts`](src/data/siteData.ts) as the compiled-in default. When an editor makes changes in `/admin`, `SiteDataContext` merges those changes on top of the defaults and saves them to that visitor's own browser `localStorage` only. This means:

- Edits made in the admin panel are only visible on the browser/device that made them — they are **not** synced to other visitors or devices.
- To ship a change to everyone, use the **Export Config** button (bottom of most admin edit pages) to copy the fully-merged `siteData.ts` contents to the clipboard, paste it into [`src/data/siteData.ts`](src/data/siteData.ts), commit, and redeploy.
- "Reset to Defaults" in the admin panel clears the local override and reverts to whatever is currently committed in `siteData.ts`.

### Authentication

Admin login is a **hardcoded** email/password check in [`src/admin/hooks/useAdminAuth.ts`](src/admin/hooks/useAdminAuth.ts) (no server, no real user accounts). Successful login just sets a flag in `localStorage`. This is intentionally lightweight for a small, trusted-editor use case — it is **not** suitable for protecting sensitive data, and the credentials are visible to anyone who reads the client bundle. Update the constants in that file to change the login credentials.

## Deployment

This project is a static single-page app optimized for static hosting and is currently **deployed on Vercel**. [`vercel.json`](vercel.json) rewrites all routes to `index.html` so client-side routing (including `/admin/*`) works correctly on refresh/direct navigation.

## Screenshots

*(Screenshots coming soon)*

---

Designed & Developed by [Abdul Mueez](https://github.com/abdulmueezdev)
