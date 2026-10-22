# Security and privacy guardrails (Phase 00)

No authentication, media persistence or geolocation features are implemented yet. The following are **required gates** for future phases, not completed security features.

- Keep `.env`, `.env.*` secrets, OAuth tokens, DB passwords, key files and exact private user coordinates out of Git, logs, PRs and public pages. `.env.example` uses non-secret placeholders only.
- The actual Laravel project (including vendor, storage, .env) must live **outside** the cPanel public directory, with only `backend/public/` web-served.
- Public tree endpoints must never serialize raw latitude/longitude. Store private WGS84 and provide privacy-safe generalized positions or no location.
- Remove GPS EXIF and all identifying metadata by re-encoding images before public delivery; enforce file size/MIME and content checks server-side.
- Server-side Laravel policies, rate limits and ownership checks for uploads, tree updates, follows/comments, moderation and private resources.
- No precise household map pins or unnecessary personal contact information in public feeds.
- Use Laravel Sanctum cookie + CSRF for first-party website; properly scoped, revocable tokens with native secure storage for Capacitor mobile.
- CI must not use a production DB. Tests/fixtures stay in isolated local or test environments.
- The existing root static demo was created **before** AGENTS.md. Its fictional sample trees and browser-only actions must not be mistaken for production data or proof of implemented security.

See `../AGENTS.md` sections 3, 8, 9, 10 and 14.

## Mandatory PHP2Shell security baseline (effective 22 October 2026)

Official PHP announced security fixes on 21 October 2026 for **CVE-2026-109618** and **CVE-2026-109619**. First fixed PHP 8.4 release: **8.4.27**.

**NO-GO on any cPanel host without verified patched PHP 8.4.27+ (8.4.x), Laravel 13 and clean Composer dependency audits.** CLI and web-server PHP are **independent checks**.

Phase 00 source controls: `backend/app/Support/PhpRuntimePolicy.php`, `backend/scripts/check-php-runtime.php`, PHPUnit policy tests, and a sanitized version-aware `GET /api/v1/health`. These do not patch PHP itself and do not establish the provider's web SAPI version.

GitHub CI must run `composer audit` and fail on advisories. During lockfile-only regeneration use `composer audit --locked`. Host provider evidence and separate web/CLI PHP checks remain mandatory before any deployment.

Follow the complete [PHP2Shell update and verification runbook](php-runtime-security.md).

Sources: https://www.php.net/releases/8_4_27.php and https://www.php.net/archive/2026.php#2026-10-21-5
