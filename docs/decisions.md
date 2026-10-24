# Architecture decision record

## ADR-001 — 2026-10-22: cPanel-first web/API architecture
**Decision:** React + TypeScript + Vite (static assets on Apache), future Capacitor mobile wrapper, Laravel API, MySQL/MariaDB, future Leaflet.

**Why:** Owner requires typical cPanel hosting with PHP/relational DB and web + mobile sharing the same rules.

**Rejected for this project:** Expo/React Native plus PostgreSQL/PostGIS as initial mandatory stack, long-running Node server, mandatory Redis/Docker/WebSockets/cloud services.

**Consequence:** Mobile builds are separate from cPanel. A web bundle cannot become an APK/IPA solely by uploading to hosting.

## ADR-002 — 2026-10-22: Laravel version is host-gated
**Decision (revised by owner):** Laravel 13 and officially patched PHP 8.4.27+ (8.4.x only) are mandatory for CLI and web SAPI. Do **not** deploy until both are verified.

**Why:** Official PHP security release on 21 October 2026 fixes PHP2Shell CVE-2026-109618/CVE-2026-109619 in 8.4.27; actual cPanel runtime is unverified. PHP 8.2/8.3 or Laravel 12 fallback is **not authorized**.

**Consequence:** Composer now requires `>=8.4.27 <8.5.0` with Laravel 13, PHP2Shell checks run in CI. Provider's actual CLI/web PHP compatibility is unknown and remains a NO-GO until verified.

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

## ADR-006 — 2026-10-22: PHP2Shell / dependency audit release gate

**Decision:** Require verified patched PHP 8.4.27+ (8.4.x only) for both web and CLI plus Laravel 13, maintained locked dependencies, `composer audit`, PHP runtime-policy unit tests, and documented host update procedure. No PHP/Laravel downgrade.

**Why:** Two critical PHP runtime vulnerabilities (CVE-2026-109618 and CVE-2026-109619) were patched in PHP 8.4.27 on 21 October 2026. PHP-level exploitation can occur before application code executes, so an app-level check does not replace upgrading.

**Consequence:** GitHub Actions validates its own runtime, and cPanel deployment remains NO-GO until independent host patch evidence. See `docs/php-runtime-security.md`.

## ADR-008 — 2026-10-24: Phase 01 social UI mock and Pages-safe routing

**Decision:** React 19/TypeScript/Vite with React Router's `HashRouter` for a safe nested GitHub Pages frontend preview under `/preview/phase-01/`. Use Lucide React, centralized CSS tokens and consistent typed fictional fixture content. Temporary UI state never becomes durable storage.

**Why:** The owner approved a navigable dashboard but explicitly prohibited real accounts, uploads, databases, backend or GPS. Hash navigation works on static host deep links without rewriting the existing GitHub Pages configuration.

**Rejected for Phase 01:** copying Facebook's visual assets, using real or exact residential GIS points, storing unprocessed camera files, choosing backend/Capacitor versions prematurely, or deploying to unverified cPanel.

**Consequence:** A successful Vite build is publicly previewable as static files but is NOT a real Laravel web app. Maintain the existing root demo, the Phase 00 static page, and the PHP 8.4.27+/Laravel 13 security gate unchanged. Reconsider browser-style URLs only after an approved cPanel staging rewrite is tested.
