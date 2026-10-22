# cPanel hosting requirements & deployment plan

**Status (2026-10-22): UNVERIFIED — No cPanel account, host plan, domain or secrets were supplied/inspected. Do not deploy yet.**

## Hosting discovery checklist

| Item | Requirement or consideration | Verified? |
|---|---|---|
| **Mandatory PHP** | **Officially patched PHP 8.4.27+ (8.4.x only)** in both **CLI and real web-serving SAPI**, Laravel 13. PHP2Shell: CVE-2026-109618/CVE-2026-109619; NO-GO if unknown/unpatched. | **No — deployment blocker** |
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
| Security | Clean `composer audit`, independently verified patched host PHP, secrets outside public root, WAF/rate limiting where supported | Host: No |

## Mandatory patched PHP deployment gate

1. **Provider evidence:** obtain the effective patched PHP 8.4.27 or newer **8.4.x** version for each API domain and its web-serving handler (PHP-FPM/LSAPI/CGI/Apache), not just MultiPHP selector setting; verify PHP workers were restarted after upgrading.
2. **CLI check:** run `php -v` and `php scripts/check-php-runtime.php` using the same PHP binary as Composer/Artisan/cron. Confirm extensions with `php -m`.
3. **Separate web check:** inspect actual PHP worker version via cPanel/provider evidence or a temporary **access-restricted, nonproduction** diagnostic executing inside the web SAPI. Do not publish `phpinfo()` or credentials. Remove temporary diagnostics.
4. **Dependency/security:** verify Laravel 13 on the approved runtime; run `composer validate --strict --no-check-publish`, `composer install`, `composer audit`, PHP policy tests and an authorized HTTP smoke check.
5. **Hard NO-GO:** if unpatched/mismatched/unknown CLI or web PHP, missing extensions, security advisories or unsafe public docroot, do not deploy. No Laravel downgrade and no mitigation-only workaround.
6. Record the checked versions, vendor patch status and verification date in private operations records, and summarize the verified/no-go status without private host details in `docs/progress.md`.

Details and secure update steps: [PHP2Shell security runbook](php-runtime-security.md).

## Future topology (placeholder hostnames only)

- `example.com`: deploy the **contents** of `frontend/dist/` after a verified `npm ci && npm run build`.
- `api.example.com`: document root is **/home/CPUSER/apps/treestory-api/public/**, where all other Laravel files reside outside public web access.
- Use a separate staging database and private app key. Never reuse production credentials in CI or Codespaces.
- Do not run migrations until an authorized target DB exists and a reviewed backup is available.
- All web/API HTTP requests in production use HTTPS. Configure exact `APP_URL`, session/cookie domains, CSRF/CORS, storage and error controls.
- If Laravel docroot cannot safely target `public/`, **block deployment** rather than exposing the repository root.
- SPA deep links may need a controlled Apache rewrite to `index.html` **only in the static React web root**, never in Laravel API root.

## Release strategy (later phase only)

1. Obtain cPanel capabilities and **prove PHP 8.4.27+ (8.4.x) in both CLI and web SAPI**, Laravel 13 and clean security audit, then request explicit staging/production approval.
2. Build in CI/local runtime, commit verified npm/composer lockfiles, run suites.
3. Provision isolated staging, confirm HTTPS/docroots, database and storage boundaries.
4. Backup, deploy static frontend and Laravel API safely, health check and run authorized migrations.
5. Test SPA deep links, Sanctum authentication/CSRF, photo re-encoding/EXIF stripping, coarse public location outputs and error responses.
6. Verify rollback/restore, then obtain separate production approval.

This document describes **requirements**, not proof of a configured host. More detail in `AGENTS.md` section 14.
