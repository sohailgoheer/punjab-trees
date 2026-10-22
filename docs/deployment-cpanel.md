# cPanel hosting requirements & deployment plan

**Status (2026-10-22): UNVERIFIED — No cPanel account, host plan, domain or secrets were supplied/inspected. Do not deploy yet.**

## Hosting discovery checklist

| Item | Requirement or consideration | Verified? |
|---|---|---|
| PHP version | Laravel 13 requires PHP >=8.3; if PHP 8.2, assess supported Laravel 12 with user approval | No |
| PHP extensions | Verify required Laravel extensions, including Ctype, cURL, DOM, Fileinfo, Filter, Hash, Mbstring, OpenSSL, PCRE, PDO, Session, Tokenizer, XML | No |
| Image extensions | GD or Imagick for safe re-encoding and thumbnail generation | No |
| Database | MySQL 8-compatible MySQL or MariaDB version, user/grants, storage quotas, backup/restore access | No |
| HTTPS | Valid SSL for web+API, forced HTTPS and secure cookies | No |
| PHP public docroot | API subdomain can point **directly to backend/public/**; Laravel project/.env/vendor remain outside public_html | No |
| Hosting file paths | Writable private storage and bootstrap/cache with safe permissions; symlink restrictions | No |
| Composer | Composer 2 availability or controlled local vendor build/upload | No |
| SSH & Git deployment | Whether SSH, deploy keys, branch pull and cron are permitted (all optional until proven) | No |
| Email | SMTP sender/domain and transactional limits for future verification | No |
| Upload/storage limits | upload_max_filesize, post_max_size, max_execution_time, memory_limit, CPU and bandwidth | No |
| Cron & jobs | Cron permitted; no always-on workers assumed | No |
| Backups | DB/file backup ownership, frequency, full restore and rollback tested | No |
| Security | Environment variables and secrets kept outside public web root; WAF/rate limiting where supported | No |

## Future topology (placeholder hostnames only)

- `example.com`: deploy the **contents** of `frontend/dist/` after a verified `npm ci && npm run build`.
- `api.example.com`: document root is **/home/CPUSER/apps/treestory-api/public/**, where all other Laravel files reside outside public web access.
- Use a separate staging database and private app key. Never reuse production credentials in CI or Codespaces.
- Do not run migrations until an authorized target DB exists and a reviewed backup is available.
- All web/API HTTP requests in production use HTTPS. Configure exact `APP_URL`, session/cookie domains, CSRF/CORS, storage and error controls.
- If Laravel docroot cannot safely target `public/`, **block deployment** rather than exposing the repository root.
- SPA deep links may need a controlled Apache rewrite to `index.html` **only in the static React web root**, never in Laravel API root.

## Release strategy (later phase only)

1. Obtain real cPanel capabilities, choose compatible PHP/Laravel versions and request explicit approval.
2. Build in CI/local runtime, commit verified npm/composer lockfiles, run suites.
3. Provision isolated staging, confirm HTTPS/docroots, database and storage boundaries.
4. Backup, deploy static frontend and Laravel API safely, health check and run authorized migrations.
5. Test SPA deep links, Sanctum authentication/CSRF, photo re-encoding/EXIF stripping, coarse public location outputs and error responses.
6. Verify rollback/restore, then obtain separate production approval.

This document describes **requirements**, not proof of a configured host. More detail in `AGENTS.md` section 14.
