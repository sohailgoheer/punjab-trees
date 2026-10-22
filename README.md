# TreeStory / Punjab Trees — engineering repository

> **Status (22 October 2026): PHASE 00 — foundation only.** TreeStory is a working title, **not** the final brand.

**Read [AGENTS.md](AGENTS.md) first.** It defines the source of truth, phase gates, product rules, security, privacy and cPanel requirements.

## What is here

- `frontend/` — a minimal React + TypeScript + Vite foundation page. **No social screens, API integration, registration or persistence** are implemented.
- `backend/` — minimal Laravel API **source scaffold** for a health route; install dependencies and run tests before calling it operational.
- `docs/` — documented architecture, decisions, cPanel checklist, roadmap, current status and safe preview instructions.
- `index.html`, `post.html`, `app.js`, `styles.css` (repository root) — **legacy public static HTML concept from before Phase 00**. Kept untouched to avoid losing existing work. Browser-local fake post actions are not a backend.
- `preview/phase-00/index.html` — a separate, explicit **static foundation information preview**, not the compiled React application.

## Prerequisites

- Node.js 22.x (Vite requires at least Node 22.12 when using Node 22), npm.
- PHP **8.3+ to run the provisional Laravel 13 scaffold**; Composer 2 and PHP extensions as required by Laravel.
- MySQL 8-compatible database for later phases (no DB is connected in Phase 00).
- Local development does **not** need cPanel credentials.

See [docs/deployment-cpanel.md](docs/deployment-cpanel.md) before selecting a host PHP/Laravel release.

## React frontend — local or Codespaces

```bash
cd frontend
npm install
npm test
npm run typecheck
npm run build
npm run dev -- --host 0.0.0.0
```

Open local http://localhost:5173 or use the forwarded port 5173 URL in GitHub Codespaces. `npm install` should generate `package-lock.json`; commit this file after a real install. Do not fabricate a lockfile.

## Laravel backend — local or Codespaces

The backend is a **source scaffold**, not a generated full Laravel installation. Its version is **conditional on verified cPanel PHP support**. On a compatible machine:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan route:list --path=api
php artisan test
php artisan serve --host=0.0.0.0 --port=8000
```

A successful boot should provide `GET /api/v1/health` returning JSON with `data.status = ok`. Never interpret an untested route file as proof the API is running. `composer install` should produce `composer.lock`; commit the verified lockfile before production deployment. Keep `.env` private. Never run migrations on production without explicit approval.

## Preview

- **Existing legacy static concept:** https://sohailgoheer.github.io/punjab-trees/
- **Phase 00 static information preview (if GitHub Pages deployment succeeds):** https://sohailgoheer.github.io/punjab-trees/preview/phase-00/
- **Actual React frontend:** Vite dev-server preview via a Codespaces forwarded port; not hosted by GitHub Pages automatically.
- **Complete React + Laravel application:** only through an authorized Codespaces/local frontend + PHP API pair, or later approved cPanel staging. GitHub Pages **cannot run PHP or MySQL**.

See [docs/preview.md](docs/preview.md). No cPanel deployment, production credentials, database migrations or live user features are part of this phase.

## Current verification and roadmap

- [Phase-by-phase roadmap](docs/roadmap.md)
- [Current work / actual test results / blockers](docs/progress.md)
- [Architecture](docs/architecture.md) | [Decisions](docs/decisions.md)
- [Safe hosting and release checklist](docs/deployment-cpanel.md)

**Do not start Phase 01 until the owner approves it.**
