# TreeStory development progress

**Updated:** 2026-10-24  
**Authorized scope:** Phase 00 only.  
**Overall state:** `TESTED` for repository and GitHub CI foundation; `BLOCKED` for verification of the real cPanel host. **No production deployment. Phase 01 NOT STARTED.**

This document is the source of truth for what was actually implemented. Read root `AGENTS.md` (version 1.1) before making changes.

## 2026-10-24 — Phase 00 / secure foundation verification

**Status:** `TESTED` (code + GitHub Actions) / `BLOCKED` (cPanel runtime and host requirements).

### Completed

- Re-inspected `AGENTS.md`, existing source, deployment workflow, CI logs and progress documentation. Preserved the earlier root HTML tree-demo files `index.html`, `post.html`, `styles.css` and `app.js`.
- Updated `backend/phpunit.xml` so **Unit + Feature** suites both execute. Before this fix, PHP security unit tests were accidentally omitted.
- Updated GitHub CI to create a **temporary, ignored test `.env`** from the dummy `.env.example`, generate a CI-only `APP_KEY`, run both Laravel and strict PHPUnit tests, and fail on future PHPUnit warnings/deprecations. The previous health-test warning was from missing `.env`, **not** from a production PHP2Shell exploit.
- Updated test workflows to official `actions/checkout@v7` and `actions/setup-node@v7`, and limited the dependency-lockfile regeneration workflow to **manual dispatch only**. Existing real npm/Composer lockfiles remain committed.
- Added optional `.devcontainer/devcontainer.json` for GitHub Codespaces with a Node 22 frontend environment, `npm ci` at creation, and port **5173** forwarding for the actual React starter. This is **not** a runtime for backend or cPanel production.
- Updated `README.md` and `docs/preview.md` with Codespaces usage and the GitHub Pages branch-based deployment limitation.

### Verification: commands actually run in GitHub Actions

**Final CI, run [40085355527](https://github.com/sohailgoheer/punjab-trees/actions/runs/40085355527): `SUCCESS`**, using the newer GitHub Actions tooling.

**Detailed clean PHP/React CI, run [40085137723](https://github.com/sohailgoheer/punjab-trees/actions/runs/40085137723): `SUCCESS`**:

| Command/check | Actual result |
|---|---|
| `cd frontend && npm ci --no-audit --no-fund` | PASS |
| `cd frontend && npm test` | PASS: **4 tests / 0 failures** |
| `cd frontend && npm run typecheck` | PASS |
| `cd frontend && npm run build` | PASS: Vite production bundle built |
| `php -v`; `php scripts/check-php-runtime.php` | PASS: GitHub CI PHP **8.4.27 (CLI)** |
| `composer validate --no-check-publish --strict` | PASS |
| `composer install --no-interaction --prefer-dist --no-progress` | PASS with genuine `composer.lock` |
| `composer audit --no-interaction` | PASS: **No reported security vulnerability advisories** on 2026-10-24 |
| `php -l` on required PHP source/tests | PASS |
| `php artisan route:list --path=api` | PASS: only `GET /api/v1/health` defined |
| `php artisan test --display-warnings` | PASS: **9 tests, 10 assertions, zero warnings** |
| `./vendor/bin/phpunit --display-warnings --fail-on-warning --fail-on-deprecation` | PASS: **9 tests, 10 assertions** |
| `php artisan serve --host=127.0.0.1 --port=8013` + `curl` GET health | PASS, **only on the GitHub runner's local web process** |

**Security policy tested:** `backend/tests/Unit/PhpRuntimePolicyTest.php` rejects unpatched PHP 8.4.24 and 8.4.26, non-approved PHP branches, and prereleases. It accepts patched 8.4.27+ in the 8.4 branch. Runtime-level PHP2Shell protection still requires a patched PHP interpreter.

**Earlier failures resolved:**
- Initial Laravel CI lacked `nunomaduro/collision`, so `php artisan test` was unavailable (corrected 2026-10-22).
- Later PHP test output contained a warning because no temporary `.env` existed in CI, and the Unit suite was not registered. Corrected and retested 2026-10-24.
- Composer lockfile audit regeneration originally omitted `--locked` for a no-install workflow; fixed, then `composer audit --locked` passed on the updated 8.4.27 lockfile.

### Preview / usage

- **Legacy tree demo, preserved:** https://sohailgoheer.github.io/punjab-trees/
- **Phase 00 static information preview:** https://sohailgoheer.github.io/punjab-trees/preview/phase-00/
- **Actual React placeholder:** create a Codespace on `main`, then run `cd frontend && npm run dev -- --host 0.0.0.0` and open forwarded **port 5173**. Codespaces configuration is committed, but a live Codespace has **not** been launched or verified in this session, so there is no genuine shareable forwarded URL.
- **Laravel health API:** `GET /api/v1/health` runs under CI's patched PHP test server only. **GitHub Pages cannot execute PHP/Laravel/MySQL.**
- GitHub Pages' most recent *verified-successful* deployment before this progress update was the branch build for commit `0d2ec6b250fad56b46caf5e7e32ae8dd353c74ba`, run [40085354958](https://github.com/sohailgoheer/punjab-trees/actions/runs/40085354958). Later branch deployments may still be processing; the public URL was **not independently HTTP-tested** from this chat.
- The existing Pages site uses branch publishing. GitHub's documentation confirms that `GITHUB_TOKEN` bot commits alone **do not trigger a branch-based Pages rebuild**, so no automatic React-on-Pages publish is claimed.

### Known issues and explicit NO-GO

- **Actual cPanel CLI PHP and web-serving PHP SAPI are UNKNOWN.** Owner security policy mandates officially patched PHP **8.4.27+ within PHP 8.4.x**, Laravel **13**, no insecure fallback. **NO DEPLOYMENT** until **both** CLI and real web worker are independently verified with provider patch evidence.
- Actual MySQL/MariaDB version, Laravel `public/` API document-root control, SSL, Composer/SSH, GD/Imagick, file quotas/limits, cron, SMTP and backup/restore capability are unverified.
- GitHub Actions / Codespaces are **not** proof the cPanel host is patched. The CI runtime security check is a developer safety gate; it cannot repair a vulnerable host PHP interpreter.
- No database, account/auth features, real photo upload, GPS data persistence, mobile native project, real social feed, or production release has been created under Phase 00.
- Frontend and backend operate as separate foundations. Existing root HTML posts are an earlier browser-only fictional demo, not real persisted tree records.
- Codespaces boot and actual mobile/desktop visual verification of React remain pending authorized usage.

### Git

- Repository: `sohailgoheer/punjab-trees`; branch: `main`; no force pushes or destructive deployments.
- 2026-10-22: `AGENTS.md` introduced (`fe1ca913`) and PHP2Shell update (`39307424`).
- 2026-10-22: React/Laravel scaffold (`1ee81284`); genuine lockfiles generated by GitHub Actions, updated for PHP 8.4.27; mandatory audit/security checks enabled.
- 2026-10-24: discover PHP Unit tests + strict CI (`16a791da`); temporary CI test config + real strict PHPUnit gate (`99efc80e`); maintain Actions and manualize lock updates (`0d2ec6b2`); Codespaces preview config (`bce21b0c`).
- This progress document is updated in a separate scoped commit; see repository commit history.

### Next suggested task

**Close the Phase 00 external hosting gate**: obtain or review the owner's cPanel capability report, especially separately verified PHP CLI + web-SAPI versions and provider patch evidence. **Do not start Phase 01 without the owner's explicit approval.**

---

## 2026-10-22 — Phase 00 / initial foundation (historical)

**Status:** `IMPLEMENTED` / `PARTIAL` at the time. Later results above supersede the earlier pending tests and dependency locks.

- Read/uploaded AGENTS.md to root, inspected and preserved legacy static demo.
- Committed React/Vite/TypeScript frontend placeholder and conditional Laravel health-API scaffold.
- Added .env.example files, versioned dependency manifests, initial frontend/backend tests and GitHub Actions CI.
- Documented architecture, cPanel requirements, decisions, roadmap, security, API/database future plans, and static Pages preview.
- Implemented strict PHP 8.4.27+ (8.4.x) PHP2Shell gate, Laravel 13 dependency constraints, audits and official patch/update runbook.
- All later test outcomes, lockfiles and corrected security guidance are documented in the **2026-10-24** record above.
