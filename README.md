# TreeStory / Punjab Trees — engineering repository

> **Status (24 October 2026): Phase 01 responsive dashboard frontend (fictional UI-only data).** TreeStory is a working title, **not** the final brand. Phase 00 PHP/cPanel security controls are preserved.

**Read [AGENTS.md](AGENTS.md) first.** It defines the source of truth, phase gates, product rules, security, privacy and cPanel requirements.

## What is here

- `frontend/` — Phase 01 React + TypeScript + Vite **interactive social dashboard**, with strict fictional fixtures, routed screens and session-only UI actions. **No API integration, real auth, uploads, GPS or persistence**.
- `backend/` — minimal Laravel API **source scaffold** for a health route; install dependencies and run tests before calling it operational.
- `docs/` — documented architecture, decisions, cPanel checklist, roadmap, current status and safe preview instructions.
- `index.html`, `post.html`, `app.js`, `styles.css` (repository root) — **legacy public static HTML concept from before Phase 00**. Kept untouched to avoid losing existing work. Browser-local fake post actions are not a backend.
- `preview/phase-00/index.html` — a separate static foundation information page.
- `preview/phase-01/` — **actual compiled React/Vite mock UI preview** (created by scoped, tested GitHub Actions build; deployed with an approved merge).

## Prerequisites

- Node.js 22.x (Vite requires at least Node 22.12 when using Node 22), npm.
- **Officially patched PHP 8.4.27 or newer PHP 8.4.x** (both CLI and web PHP), Laravel 13, Composer 2 and required extensions. PHP2Shell CVE-2026-109618/CVE-2026-109619 are hard deployment blockers.
- MySQL 8-compatible database for later phases (no DB is connected in Phase 00).
- Local development does **not** need cPanel credentials.

Before any PHP deployment, read [PHP2Shell security and upgrade procedure](docs/php-runtime-security.md) and [cPanel prerequisites](docs/deployment-cpanel.md). Actual cPanel host security remains unverified.

## React frontend — local or Codespaces

Optional one-click Codespaces development configuration: `.devcontainer/devcontainer.json` (Node 22, auto `npm ci`, forwarded port 5173). **It is not a production PHP/cPanel runtime.**

```bash
cd frontend
npm ci
npm run lint
npm test
npm run typecheck
npm run build
npm run dev -- --host 0.0.0.0
```

Open local http://localhost:5173 or use the forwarded port 5173 URL in GitHub Codespaces. The real `frontend/package-lock.json` was generated and committed by a GitHub Actions registry-resolution run. Use `npm ci` for reproducible installs.

## Laravel backend — local or Codespaces

The backend is a **source scaffold**, not deployed production PHP. Version requirements are **mandatory Laravel 13 and patched PHP >=8.4.27 <8.5.0**. On a compatible machine:

```bash
cd backend
php scripts/check-php-runtime.php
composer install
composer audit --no-interaction
cp .env.example .env
php artisan key:generate
php artisan route:list --path=api
php artisan test
php artisan serve --host=0.0.0.0 --port=8000
```

A successful boot should provide `GET /api/v1/health` returning JSON with `data.status = ok`. Never interpret an untested route file as proof the API is running. `backend/composer.lock` has been generated/committed by real GitHub Actions registry resolution on PHP 8.4.27. The CLI check does not verify the separate cPanel web SAPI. Keep `.env` private. Never run migrations on production without explicit approval.

## Preview

- **Existing legacy static concept:** https://sohailgoheer.github.io/punjab-trees/
- **Phase 00 static information preview (if GitHub Pages deployment succeeds):** https://sohailgoheer.github.io/punjab-trees/preview/phase-00/
- **Phase 01 React frontend:** https://sohailgoheer.github.io/punjab-trees/preview/phase-01/ (GitHub Pages deployment succeeded 2026-10-24; real-device inspection pending), or Vite dev preview via Codespaces forwarded port 5173.
- **Complete React + Laravel application:** only through an authorized Codespaces/local frontend + PHP API pair, or later approved cPanel staging. GitHub Pages **cannot run PHP or MySQL**.

See [docs/preview.md](docs/preview.md). No cPanel deployment, production credentials, database migrations or live user features are part of this phase.

## Current verification and roadmap

- [Phase-by-phase roadmap](docs/roadmap.md)
- [Current work / actual test results / blockers](docs/progress.md)
- [Architecture](docs/architecture.md) | [Decisions](docs/decisions.md)
- [Safe hosting and release checklist](docs/deployment-cpanel.md)

**Phase 01 frontend is approved, implemented, tested and statically published. Do not start Phase 02 without the owner's explicit new approval.**
