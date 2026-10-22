# Preview / test workflow

## Option A: static GitHub Pages (works without a backend)

- Existing legacy demo: https://sohailgoheer.github.io/punjab-trees/
- Phase 00 static status preview: https://sohailgoheer.github.io/punjab-trees/preview/phase-00/

The Phase 00 URL only works after GitHub Pages deploys the new commit. It is a **standalone static information page**, not a built React/Vite bundle and not a live PHP application.

GitHub Pages uses the repository's existing `main` branch root publishing settings. A successful build is not guaranteed until its Actions log says success.

## Option B: real React frontend development preview via GitHub Codespaces

1. Open `https://github.com/sohailgoheer/punjab-trees`.
2. Click `Code` → `Codespaces` → `Create codespace on main` (only if Codespaces is available on your account).
3. In its terminal:
   ```bash
   cd frontend
   npm install
   npm test
   npm run typecheck
   npm run dev -- --host 0.0.0.0
   ```
4. In Codespaces `Ports`, open **port 5173**. The forwarded HTTPS link is generated for that Codespace. Its address **cannot be predicted** and it may be private by default.
5. Preview is a Phase 00 placeholder only. No DB/API calls are made yet. Stop the development server or Codespace after testing.

## Option C: complete frontend + Laravel API in Codespaces / local dev

This is a **technical smoke test**, not a complete application and not a production deployment.

Terminal 1 (React): `cd frontend && npm install && npm run dev -- --host 0.0.0.0` → port 5173.

Terminal 2 (provisional Laravel, only with PHP 8.3+, Composer and required extensions):
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan route:list --path=api
php artisan test
php artisan serve --host=0.0.0.0 --port=8000
```
Forward **port 8000** privately and visit `/api/v1/health`. No frontend API integration is attempted in Phase 00. Never expose your private `.env`, exact private coordinates or real credentials.

**GitHub Pages cannot host PHP, Laravel, MySQL or a working full-stack app.** Real staging preview belongs on an approved PHP host with separately configured frontend and API; that is reserved for Phase 09.
