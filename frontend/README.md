# Ethio Infra Academy — Frontend

Public marketing site (home, courses/tracks, about, contact) built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Getting started

```bash
cp .env.example .env.local   # then adjust values
npm install
npm run dev                  # http://localhost:3000
```

| Command         | Purpose                                   |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the dev server                      |
| `npm run build` | Production build (also the type-check gate) |
| `npm run start` | Serve the production build                |
| `npm run lint`  | Run ESLint                                |

## Environment variables

| Variable              | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the site, used for metadata. Inlined at build time.      |
| `API_URL`             | Go backend base URL (server-side only). If unset, contact submissions are logged instead of sent. |

## Project structure

```
src/
├── app/                 # Routes: /, /courses, /courses/[slug], /about, /contact
├── components/
│   ├── layout/          # Site header and footer
│   ├── ui/              # Generic UI pieces
│   └── features/tracks/ # Track card and icon
├── config/site.ts       # Site name, navigation and the six learning tracks
├── lib/api.ts           # Server-only fetch wrapper for the Go backend
├── services/            # Per-feature backend calls (server-only)
└── types/               # Shared TypeScript types
```
