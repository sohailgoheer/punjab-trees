# Development progress — source of truth

> **Last recorded: 2026-10-22. Phase 00 only.** Do not interpret plans as implemented features. No cPanel server has been accessed.

## 2026-10-22 — Phase 00 / foundation scaffolding
Status: **PARTIAL — host verification and lockfiles pending.**

### Completed
- Uploaded the user's exact 650-line `AGENTS.md` to repository root and read all instructions.
- Inspected the existing root static HTML proof of concept; preserved `index.html`, `post.html`, `styles.css` and `app.js`.
- Added a minimal React + TypeScript + Vite placeholder under `frontend/`, isolated from the older demo, plus pinned package manifest and Node built-in smoke tests.
- Added a provisional Laravel 13 (PHP >=8.3) health API source scaffold under `backend/`, plus Composer manifest, dummy `.env.example`, PHP routing and a feature test.
- Created a CI workflow to run real installs, TypeScript checks, frontend build and backend health tests in GitHub Actions (CI is **not** a production deployment).
- Documented architecture and phase gates, cPanel hosting unknowns, staging/security constraints and local/Codespaces preview.
- Created a standalone, clearly labelled static information preview under `preview/phase-00/`.

### Verification / actual results (updated after CI results)

- Repository source was written and committed using the GitHub connector.
- Initial CI run `39824120209`: **frontend job PASS** (npm install, npm test, npm run typecheck, npm run build); backend `composer validate`, `composer install`, PHP syntax checks and `php artisan route:list --path=api` PASS; backend `php artisan test` **FAIL** because `nunomaduro/collision` was missing from dev dependencies. That dependency was added in a corrective commit.
- Corrective CI run: **pending result** at time of this record. Do not mark backend health feature test passing until GitHub Actions confirms it.
- Local container: `node -v` = v22.16.0, `php -v` = PHP 8.4.24, but `composer` is not available and npm registry DNS lookup failed (`EAI_AGAIN`). Therefore full local dependency install/build **NOT RUN**. CI is the independent verification environment.
- cPanel PHP/DB/SSL/SSH/disk/document-root support **NOT VERIFIED** (user has not supplied hosting access or capability report).
- GitHub Pages preview of the new `preview/phase-00/` file: **pending publication verification**. Existing root static demo was previously deployed; neither is evidence of a live Laravel API.

### Known issues / limitations
- Provisional PHP >=8.3 Laravel 13 selection may not match actual cPanel PHP; stop and request owner confirmation if host lacks it.
- `frontend/package-lock.json` and `backend/composer.lock` cannot be committed until genuine installs generate verified versions. Never synthesize lockfile contents.
- The root HTML demo still uses browser-only fake content and is **not** integrated with React/Laravel. Existing fictional locations must never be treated as real public addresses.
- Codespaces test URL is ephemeral and cannot be issued without an actual running Codespace; user may open it using the documented port-forward method.
- No production DB, auth, user upload, private GPS processing, cPanel deployment or native mobile build implemented.

### Git history
- AGENTS.md initial root commit: `fe1ca913213f7b6b3e03cc4281a34ecf4c13ad5a`.
- Foundation code commit: `1ee81284a25e6dc16c2deeb053e039cbfcc974b4`.
- Corrective Laravel test dependency commit: `169fbd2e3964635f37b5742048a4cdbbcb80d7b4`.
- Branch: `main`. Preserve production/legacy work; no force push or deployment.

### Next suggested task
Verify latest CI, genuine lockfile creation and the user's cPanel capability checklist for Phase 00 closure. **Do not start Phase 01 without explicit approval.**
