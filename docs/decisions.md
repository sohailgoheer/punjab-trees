# Architecture decision record

## ADR-001 — 2026-10-22: cPanel-first web/API architecture
**Decision:** React + TypeScript + Vite (static assets on Apache), future Capacitor mobile wrapper, Laravel API, MySQL/MariaDB, future Leaflet.

**Why:** Owner requires typical cPanel hosting with PHP/relational DB and web + mobile sharing the same rules.

**Rejected for this project:** Expo/React Native plus PostgreSQL/PostGIS as initial mandatory stack, long-running Node server, mandatory Redis/Docker/WebSockets/cloud services.

**Consequence:** Mobile builds are separate from cPanel. A web bundle cannot become an APK/IPA solely by uploading to hosting.

## ADR-002 — 2026-10-22: Laravel version is host-gated
**Decision:** Provisional Laravel 13-compatible source scaffold (`backend/composer.json`, PHP >=8.3). Do **not** deploy until cPanel runtime is checked.

**Why:** Actual cPanel PHP/extensions, Composer and API docroot are not verified. Laravel 13 requires PHP 8.3+. A supported Laravel 12 fallback requires separate owner approval if PHP 8.2 is found.

**Consequence:** Composer dependencies/health tests can be checked in CI with PHP 8.4; cPanel compatibility itself remains unknown.

## ADR-003 — 2026-10-22: Preserve legacy root demo
**Decision:** Keep the existing four root demo files unchanged. Build the future product under `frontend/` and `backend/`.

**Why:** The earlier demo is already reachable via GitHub Pages. Deleting it during foundation work violates inspect-before-edit and would remove existing work.

**Consequence:** Root Pages demo is not evidence of React/backend deployment. A separate clearly labelled Phase 00 static information preview is served at `preview/phase-00/`.

## ADR-004 — 2026-10-22: Minimal foundation before social features
**Decision:** No accounts, tree tables, uploads, timeline database, public precise map, notifications or native projects in Phase 00. Record them as future phases.

**Why:** AGENTS.md requires a controlled phase gate and real, testable functionality.

**Consequence:** The React page is an honest placeholder; the Laravel API source contains only a minimal health endpoint. No production data or credentials.

## ADR-005 — 2026-10-22: GitHub Pages preview and CI boundaries
**Decision:** Keep GitHub Pages' current branch deployment for existing static files. Add GitHub Actions test-only workflow, no automatic cPanel deployment.

**Why:** GitHub Pages cannot execute Laravel/PHP or MySQL; hosting has not been authorized. CI must not touch real DBs or share secrets.

**Consequence:** Use Codespaces forwarded ports or local development for React + API testing. GitHub Pages preview at `preview/phase-00/` is a standalone static status page, **not** Vite-compiled React.
