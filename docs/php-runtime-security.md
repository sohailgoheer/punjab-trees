# PHP2Shell response and patched PHP 8.4.x operating procedure

**Mandatory as of 22 October 2026.** Phase 00 documentation and release gate only. No cPanel installation or production deployment is authorized.

## Official advisory

On 21 October 2026 the PHP Security Team released **PHP 8.4.27** to fix **CVE-2026-109618** and **CVE-2026-109619** (PHP2Shell). These vulnerabilities can allow unauthenticated remote code execution before Laravel middleware executes. An application-level workaround is NOT a complete fix.

Sources:
- https://www.php.net/releases/8_4_27.php
- https://www.php.net/archive/2026.php#2026-10-21-5
- https://github.com/NCSC-NL/php2shell

## Mandatory TreeStory baseline

- **PHP:** official patched, stable **8.4.27 or later within the PHP 8.4.x branch** for BOTH PHP CLI and actual web-serving PHP SAPI.
- **Laravel:** version 13, plus compatible maintained dependencies.
- **Composer:** lock a verified dependency graph, run `composer audit` (or `composer audit --locked` immediately after lockfile generation).
- **Deployment gate:** fail closed if either PHP runtime is below 8.4.27, an unapproved PHP branch, PHP patch status is unverified, extensions are missing, a Composer vulnerability exists, or a required test fails.
- Do **not** silently downgrade Laravel or use another PHP branch if the host is incompatible. Change hosting instead, subject to owner approval.

Note: official PHP has also patched other branches, but the owner mandates only PHP 8.4.x here.

## Runtime checks — independent CLI and web

1. Obtain written cPanel provider evidence naming the PHP release, packaging/security patch, handler (PHP-FPM, LSAPI, mod_php, CGI), and restart confirmation for **each intended API domain**.
2. In authorized cPanel Terminal / SSH verify the PHP binary used by Composer, Artisan and cron using `php -v` and `php scripts/check-php-runtime.php`. Also check required extensions via `php -m`. Do not paste or log full environment dumps or credentials.
3. **Independently verify the web worker** through the domain's cPanel MultiPHP Manager/selector plus provider evidence. If necessary use a temporary access-restricted diagnostic on an authorized **nonproduction** host that checks web-executed `PHP_VERSION`. Never keep an unauthenticated public `phpinfo()` script. Remove the diagnostic after verification.
4. Recheck after the provider installs/restarts PHP-FPM, LiteSpeed or Apache workers; configuration settings alone may not reflect the active process.
5. Record the **version and evidence** for CLI and web separately in a private operational record. Do not store private host paths, tokens or production secrets in Git.
6. If versions mismatch, the worker still runs a vulnerable version, or evidence is unavailable, mark **NO-GO**. Do not deploy application code. Existing unpatched public PHP services need an urgent provider-led security response.

## CI and dependency update procedure

- Ensure CI uses patched PHP 8.4.x and executes `php scripts/check-php-runtime.php` *before* invoking Composer/Artisan.
- Run `composer validate --strict --no-check-publish` and `composer install --no-interaction` with the committed, genuinely generated `composer.lock`.
- Run `composer audit --no-interaction` after install; use `composer audit --locked --no-interaction` in workflows that resolve a lockfile without installing dependencies.
- Run `php artisan test`, PHP syntax/lint checks and a local HTTP health smoke check. The local runner's PHP CLI and built-in dev web server do **not** prove cPanel's active PHP runtime.
- Fix advisories by moving to compatible maintained dependency versions. Regenerate and commit lockfiles through a genuine registry resolution; do not hand-edit lockfiles or ignore audit failures.
- For a provider PHP security update: review official security release, apply patched PHP with hosting admin, restart all PHP workers, verify CLI/web independently, run dependency audit and tests, verify HTTPS/APP_DEBUG/secure docroot and backups. Request separate authorization for any staging/production changes.
- Before deployment, securely back up application and database. Confirm rollback plan without returning to a vulnerable PHP version.
- Update `docs/progress.md` with the actual patch versions, audit outcomes, tests, blockers and go/no-go decision.

## Current host status

**NO-GO, unverified:** The actual cPanel hosting provider, CLI PHP version, web PHP SAPI/version, SSL and docroot have not been connected or checked. GitHub Actions may verify its own patched runner, but that cannot certify future cPanel hosting.

This security requirement remains in effect in future phases until explicitly changed by the owner.
