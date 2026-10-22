# Backend — provisional Laravel API scaffold

**Phase 00 only.** This source is conditional on PHP 8.3+ and Composer 2 being available on the intended cPanel host. Do not deploy the scaffold until it boots and tests pass on an authorized environment.

- `routes/api.php` defines `GET /api/v1/health`; it does not touch a database.
- `public/` is the **only** directory an API web subdomain may serve. Keep the framework root, `.env`, `vendor/`, logs and private uploads outside the public document root.
- No authentication, MySQL tables, image uploads, sessions or production integration exists yet.
- Before an actual deployment, verify cPanel PHP version/extensions, Composer availability, MySQL/MariaDB version, document-root control, SSL, image-processing facilities and storage/cron limits.
- A `composer.lock` is currently **pending a genuine install**. Never commit an invented lockfile.

## Local commands (on a compatible developer machine or Codespaces)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan route:list --path=api
php artisan test
php artisan serve --host=0.0.0.0 --port=8000
```

Visit `http://127.0.0.1:8000/api/v1/health` only **after** the Laravel framework actually starts. GitHub Pages cannot execute this backend.

If the target cPanel host runs PHP 8.2, stop and request owner approval for a still-supported Laravel 12 fallback, update `composer.json`, validate dependencies and rerun tests. Do not silently switch versions.
