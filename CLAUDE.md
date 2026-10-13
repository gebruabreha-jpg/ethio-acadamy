# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Early-stage knowledge-management app split into two independent parts in one git repo (no root `package.json` or Go workspace):

- `backend/` — Go module `backend` (Go 1.27). **No Go source exists yet**; only `go.mod`/`go.sum` and empty scaffold dirs.
- `frontend/` — Next.js 16 (App Router) + React 19 + Tailwind CSS v4: the public marketing site for "Ethio Infra Academy" (home, courses/tracks, about, contact). Content is static; articles are placeholders until the backend serves them.
- **Articles belong to a track — there is no standalone `/posts` section.** A track page (`/courses/[slug]`) lists its own articles, and each article will live at `/courses/[slug]/[postSlug]`. Keep the data model the same way (every post has a track).

There are no tests yet in either part.

## Commands

Frontend (run inside `frontend/`; dependencies must be installed there, not at the repo root):

```
npm install
npm run dev      # dev server
npm run build    # production build — use as the type-check/compile gate
npm run lint     # eslint (flat config: next core-web-vitals + typescript)
```

Backend (run inside `backend/`):

```
go mod tidy              # all deps are currently "// indirect" until code imports them
go run ./cmd/api         # intended entrypoint once cmd/api/main.go exists
go test ./...            # single test: go test ./internal/<pkg> -run TestName
```

## Backend architecture (planned)

Directory layout already created: `cmd/api` (entrypoint), `internal/api` (router/server setup), `internal/handlers` (HTTP handlers), `internal/database` (DB connection), `internal/models` (GORM models), `pkg` (reusable/public code).

Dependencies chosen in `go.mod`: Gin (+ `gin-contrib/cors` for the frontend origin), GORM with the Postgres driver (pgx v5), and `pgvector-go` for embedding/vector columns. The database is Neon Postgres. `go.mod` also lists the MongoDB driver — this is unused/likely accidental; prefer Postgres and drop it rather than building on it.

Configuration comes from environment variables, documented in `backend/.env.example`:
- `DATABASE_URL` — Neon Postgres URL (`sslmode=require`; port defaults to 5432 when omitted)
- `PORT` — HTTP port (example: 8080)

No dotenv loader is in `go.mod` yet; add one (e.g. `github.com/joho/godotenv`) or export the vars before running. Real `.env` files are git-ignored; only `.env.example` is tracked.

## Frontend notes

- **Read `frontend/AGENTS.md` first:** this Next.js version has breaking changes relative to training data. Consult `frontend/node_modules/next/dist/docs/` before writing Next.js code and heed deprecation notices. `next dev` re-adds that AGENTS.md block automatically.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, and wires Tailwind through a Turbopack CSS loader (`@tailwindcss/turbopack`) rather than PostCSS.
- Tailwind v4 is configured CSS-first in `src/app/globals.css` (`@import "tailwindcss"`); there is no `tailwind.config.js`.
- Import alias `@/*` → `frontend/src/*`.
- `src/config/site.ts` is the single source of truth for site name, nav, and the six learning tracks. Tracks render at `/courses/[slug]` (prerendered via `generateStaticParams`). Track icons are a `TrackIconName` union mapped to lucide-react components in `src/components/features/tracks/track-icon.tsx`; adding an icon requires updating both. Keep the `as const satisfies readonly X[]` form on config arrays — plain `satisfies X[]` silently widens the literals.
- With `cacheComponents`, the `dynamicParams`/`dynamic`/`revalidate` segment exports are removed. Unknown `/courses/<slug>` values render the not-found UI with `noindex` but a 200 status (the PPR stream has already started); this is expected.
- Backend access is server-side only: `src/lib/api.ts` (`apiFetch`, `ApiError`; base URL from `API_URL`, 10s timeout, errors expected as `{"error": "..."}`) is used by per-feature modules in `src/services/`, which are called from Server Actions/Server Components. Both are marked `import "server-only"`, so never import them from `"use client"` files.
- The contact form (`src/app/contact/`) uses a Server Action with `useActionState`, validates server-side, then calls `services/contact.ts` → `POST /api/v1/contact` on the backend (endpoint not built yet). If `API_URL` is unset, the service logs the message instead of sending it.
- Layouts use the generated global `LayoutProps<"/">` type (from `.next/types`, produced by dev/build).
