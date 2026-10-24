# TreeStory development progress

**Updated:** 2026-10-24  
**Authorized scope:** Phase 00 and the separately approved Phase 01. Phase 02 needs explicit new approval.  
**Overall state:** Phase 00 foundation TESTED, Phase 01 frontend IMPLEMENTED/TESTED with successful static GitHub Pages deployment. **Actual cPanel PHP/MySQL deployment remains BLOCKED and Phase 02 NOT STARTED.**

This document is the source of truth for what was actually implemented. Read root `AGENTS.md` (version 1.1) before making changes.

## 2026-10-24 — Phase 01 / social dashboard frontend

**Status:** IMPLEMENTED + TESTED + STATIC PREVIEW PUBLISHED via GitHub Pages workflow. **No Laravel/MySQL production deployment.**

### Completed

- Approved Phase 01: polished React 19 + TypeScript + Vite social UI with forest/sage design tokens and Lucide icons.
- Desktop 3-column social shell: left navigation, sticky search/header, central community feed, fixture-derived right sidebar.
- Mobile layout: responsive single-column feed and five bottom tabs (Home, Explore, Add, Activity, Profile).
- Screens: Home Feed, canonical Tree Profile with dated photo timeline, individual Photo Update Detail, Add Tree / Existing Tree / Growth Update preview form, stylized non-georeferenced Explore Map, fictional User Profile, Notifications, and Not Found.
- **One permanent fictional tree ID per tree**, 6 fictional tree profiles, 15 dated post fixtures and consistent authors/comments across cards/routes. Publication order in feed and observation order in timeline are explicitly different.
- Working **browser-session-only** interactions: filtering, Load More, following, liking, saving, clipboard share where permitted, selecting an observation, simulated comments, species/map selector, demo form confirmation, and notification read state.
- Safety boundaries clearly labelled: no real GPS collection, real map pin, backend/API call, authentication, persistent user data, upload or media processing. Any selected demo photo file is handled by **filename only**, with no upload or binary storage.
- Created a tested Vite static build at `preview/phase-01/`, using `HashRouter` so shareable nested Pages links work without rewrite rules. Kept pre-existing root HTML demo, Phase 00 preview and patched PHP 8.4.27+/Laravel 13 backend controls intact.
- Updated `docs/ui-spec.md`, `docs/decisions.md`, `docs/roadmap.md`, `docs/preview.md` and repository README for this scope.

### Verification — actual GitHub Actions

**Branch build:** [Phase 01 preview run 40089469396](https://github.com/sohailgoheer/punjab-trees/actions/runs/40089469396) **SUCCESS**. Genuine updated `frontend/package-lock.json` generated and locked, then lint/test/typecheck/build passed; the compiled Vite bundle was written into `preview/phase-01/`.

**Pull request:** [PR #1](https://github.com/sohailgoheer/punjab-trees/pull/1) passed required frontend + preserved backend security CI [run 40089783076](https://github.com/sohailgoheer/punjab-trees/actions/runs/40089783076).

**Final merged `main` CI:** [run 40089876277](https://github.com/sohailgoheer/punjab-trees/actions/runs/40089876277) **SUCCESS**.

| Actual command/check | Result |
|---|---|
| `cd frontend && npm ci --no-audit --no-fund` | PASS |
| `cd frontend && npm run lint` | PASS |
| `cd frontend && npm test` | PASS: **5 Node smoke tests + 15 Vitest/React tests = 20 tests** |
| `cd frontend && npm run typecheck` | PASS, strict TypeScript |
| `cd frontend && npm run build` | PASS, production Vite assets built |
| `cd backend && php scripts/check-php-runtime.php` | PASS: PHP 8.4.27 CI runtime |
| `cd backend && composer validate --no-check-publish --strict` | PASS |
| `cd backend && composer install` plus `composer audit` | PASS: no reported security advisories |
| `cd backend && php artisan test --display-warnings` | PASS: **9 tests / 10 assertions** |
| `cd backend && ./vendor/bin/phpunit --fail-on-warning --fail-on-deprecation` | PASS |
| CI HTTP `GET /api/v1/health` | PASS, GitHub runner only |

**Static GitHub Pages deployment:** [run 40089875981](https://github.com/sohailgoheer/punjab-trees/actions/runs/40089875981) **SUCCESS** on the Phase 01 merge commit `fa8e95f0ea6feb957c071b9dc59c4a988096b848`. The nested compiled assets and `preview/phase-01/index.html` are verified in `main`. A separate external HTTP fetch of the Pages site was blocked by this assistant environment; **GitHub reports the Pages deployment succeeded**, but visual QA on an actual user's browser/device has not been independently performed here.

### Preview and usage

- **Phase 01 compiled React preview:** https://sohailgoheer.github.io/punjab-trees/preview/phase-01/
- Demo tree profile: https://sohailgoheer.github.io/punjab-trees/preview/phase-01/#/trees/01ARZ3NDEKTSV4RRFFQ69G5FAV
- Demo dated post: https://sohailgoheer.github.io/punjab-trees/preview/phase-01/#/posts/post-neem-oct
- Separate legacy HTML home: https://sohailgoheer.github.io/punjab-trees/
- Separate Phase 00 static status page: https://sohailgoheer.github.io/punjab-trees/preview/phase-00/
- **Codespaces** fallback: `cd frontend && npm ci && npm run dev -- --host 0.0.0.0`, open forwarded port 5173 (requires opening an actual Codespace; no fabricated URL).

### Known issues / current boundaries

- Nothing in Phase 01 saves to MySQL, reads an API, uploads photos, requests GPS, verifies users, sends push notifications or creates a native mobile build. Static preview is NOT a deployed PHP backend.
- Stylized map uses **illustrative percentage positions**, not latitude/longitude. All people, trees, dates and activity are explicitly fictional. Stock photo links require an internet connection and may not accurately represent stated species.
- Browser-only likes/follows/saved items/comments/notification read status reset on refresh, as designed.
- Actual cPanel PHP **CLI and web SAPI**, required PHP extensions, API docroot, MySQL/MariaDB and SSL remain unverified. Strict PHP2Shell patched PHP **8.4.27+ (8.4.x)**, Laravel 13 and security audit gates remain **NO-GO for real deployment** until hosting evidence is supplied.
- React uses hash URLs for safe branch-based static Pages publishing; this is a deliberate preview tradeoff, not the final decision for SEO/social rich previews.
- CI tools emitted a non-blocking npm deprecation warning about an ESLint 9 development package; lint/build/tests still passed. Review dependency maintenance at an approved future maintenance milestone.
- Physical mobile browser UI/screenshot testing was not available through this connector. Responsive breakpoints are implemented in CSS; real-device visual QA is still recommended.

### Git / Phase gate

- Feature branch: `feat/phase-01-social-dashboard`, PR #1 **merged**.
- Main merge commit: `fa8e95f0ea6feb957c071b9dc59c4a988096b848`.
- Existing Phase 00 work retained, no force-push, no secrets committed or cPanel deployment attempted.
- **Phase 01 is complete in implemented/tested static-preview scope. STOP here. Phase 02 is NOT STARTED and requires explicit owner approval.**

### Next suggested task

Only after separate owner approval, plan Phase 02's **MySQL schema and Laravel 13 authentication** against verified patched cPanel PHP (CLI and web) or an isolated patched development host. Do not begin implementation without authorization.

---

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
