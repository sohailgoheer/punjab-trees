# Backend — provisional Laravel API scaffold

**Phase 00 only.** Mandatory patched PHP **8.4.27 or newer 8.4.x**, Laravel 13, Composer 2 and maintained dependencies. PHP2Shell CVE-2026-109618/CVE-2026-109619 are hard blockers. No deploy until actual cPanel CLI and web SAPI have been independently verified.

- `routes/api.php` defines `GET /api/v1/health`; it does not touch a database.
- `public/` is the **only** directory an API web subdomain may serve. Keep the framework root, `.env`, `vendor/`, logs and private uploads outside the public document root.
- No authentication, MySQL tables, image uploads, sessions or production integration exists yet.
- Before an actual deployment, verify cPanel PHP version/extensions, Composer availability, MySQL/MariaDB version, document-root control, SSL, image-processing facilities and storage/cron limits.
- Genuine `composer.lock` is committed, resolved by GitHub Actions using patched PHP 8.4.27. Run `composer audit`, PHP runtime checks and feature tests before any authorized release.

## Local commands (on a compatible developer machine or Codespaces)

```bash
php scripts/check-php-runtime.php
composer install
composer audit --no-interaction
cp .env.example .env
php artisan key:generate
php artisan route:list --path=api
php artisan test
php artisan serve --host=0.0.0.0 --port=8000
```

Visit `http://127.0.0.1:8000/api/v1/health` only **after** the Laravel framework actually starts. GitHub Pages cannot execute this backend.

If a cPanel host cannot provide verified patched PHP 8.4.x (>=8.4.27) independently for CLI and web SAPI, **deployment is prohibited**, with no automatic Laravel/PHP downgrade. See `../docs/php-runtime-security.md`.
