# Preview / test workflow

## Option A: static GitHub Pages (works without a backend)

- Existing legacy demo: https://sohailgoheer.github.io/punjab-trees/
- Phase 00 static status preview: https://sohailgoheer.github.io/punjab-trees/preview/phase-00/

The Phase 00 URL only works after GitHub Pages deploys the new commit. It is a **standalone static information page**, not a built React/Vite bundle and not a live PHP application.

GitHub Pages uses the repository's existing `main` branch root publishing settings. A successful build is not guaranteed until its Actions log says success.

## Option B: real React frontend development preview via GitHub Codespaces

1. Open `https://github.com/sohailgoheer/punjab-trees`.
2. Click `Code` → `Codespaces` → `Create codespace on main` (only if Codespaces is available on your account).
   - The committed `.devcontainer/devcontainer.json` selects a maintained Node 22 development image, automatically runs `npm ci` inside `frontend/`, and configures port 5173 preview. **This is an optional Codespaces environment, not a Docker/cPanel production requirement.**
   - The Codespace itself has not been provisioned/tested by the GitHub connector; startup success and a forwarded link require opening it in your account.
3. In its terminal:
   ```bash
   cd frontend
   npm test
   npm run typecheck
   npm run dev -- --host 0.0.0.0
   ```
4. In Codespaces `Ports`, open **port 5173** after `npm run dev`. The forwarded HTTPS link is generated for that Codespace. Its address **cannot be predicted** and it may be private by default.
5. Preview is a Phase 00 placeholder only. No DB/API calls are made yet. Stop the development server or Codespace after testing.

## Option C: complete frontend + Laravel API in Codespaces / local dev

This is a **technical smoke test**, not a complete application and not a production deployment.

Terminal 1 (React): `cd frontend && npm install && npm run dev -- --host 0.0.0.0` → port 5173.

Terminal 2 (Laravel 13, ONLY with officially patched PHP 8.4.27+ within 8.4.x, Composer and required extensions):
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
Forward **port 8000** privately and visit `/api/v1/health`. This verifies only the Codespaces/local PHP web process, not the cPanel host. No frontend API integration is attempted in Phase 00. Never expose your private `.env`, exact private coordinates or real credentials.

**GitHub Pages cannot host PHP, Laravel, MySQL or a working full-stack app.** Real staging preview belongs on an approved PHP host with separately configured frontend and API; that is reserved for Phase 09.

## Why not publish React from a CI bot commit to branch-based GitHub Pages?

The repository currently uses GitHub Pages **Deploy from a branch**, serving the existing root HTML demo plus the Phase 00 static information preview. Per GitHub Docs, **commits made by GitHub Actions using `GITHUB_TOKEN` do not trigger a Pages build**. To avoid falsely claiming automatic React deployment or changing publishing settings without approval, Phase 00 keeps the current Pages source unchanged and provides actual React preview via Codespaces port 5173. An optional approved change to a custom Pages artifact workflow can be considered in a later phase, after preserving all existing public paths.

Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Phase 01 — actual compiled React social dashboard

**Intended GitHub Pages URL:** https://sohailgoheer.github.io/punjab-trees/preview/phase-01/

This folder contains **Vite-built React production assets**, unlike the Phase 00 standalone static information page. No PHP backend is involved. It uses React Router's hash paths so its interactive screens load and refresh correctly in GitHub Pages:

- `#/ ` (without the space) Home feed
- `#/explore` sample map and species filters
- `#/add-tree` UI-only registration/update form
- `#/trees/01ARZ3NDEKTSV4RRFFQ69G5FAV` permanent fictional tree profile
- `#/posts/post-neem-oct` dated observation + comments
- `#/profile` fictional member profile
- `#/notifications` fictional activity

**Publishing mechanism:** The scoped `.github/workflows/phase-01-preview.yml` runs on approved Phase 01 feature-branch pushes, resolves a **genuine npm lockfile**, then executes lint, tests, typecheck and build. Only successful builds are copied into `preview/phase-01/` and bot-committed to the feature branch. A subsequent *authorized human/connector merge commit* into `main` triggers the repository's existing **branch-based GitHub Pages** deployment (a `GITHUB_TOKEN` bot commit on its own cannot trigger Pages). The existing root demo and Phase 00 path remain unchanged.

If the Pages deployment is unsuccessful, the complete frontend can still be previewed via Codespaces, using the existing `.devcontainer/devcontainer.json` and forwarded port 5173:

```bash
cd frontend
npm ci
npm run lint
npm test
npm run typecheck
npm run dev -- --host 0.0.0.0
```

**GitHub Pages is public, read-only hosting**. Phase 01 social actions are transient React state, with no authentication, uploads, GPS, backend API or persistence. The photo stock assets are retrieved over HTTPS from Unsplash when available. Do not mistake the Pages demo for the real deployment to future cPanel hosting.
