# Phased delivery roadmap

Owner approval is required between phases. Statuses below describe **actual work**, not aspirations.

## Phase 00 — Repo discovery, cPanel compatibility and architecture foundation
**Status:** FOUNDATION SCAFFOLDED; HOST VERIFICATION PENDING.

Acceptance checklist:
- [x] Read `AGENTS.md` and inspect the existing GitHub root files.
- [x] Preserve existing demo without breaking earlier URLs.
- [x] Add React/TypeScript/Vite starter source, package manifest and reproducible smoke tests.
- [x] Add provisional Laravel API health source, PHP manifest and test scaffold.
- [x] Record cPanel host requirements and explicit unknowns (no hosting credentials provided).
- [x] Document architecture, security boundaries, local setup and preview method.
- [ ] Confirm actual cPanel **CLI and web SAPI independently** run officially patched PHP 8.4.27+ (8.4.x), required Laravel 13 extensions, provider patch evidence, MySQL/MariaDB, docroot, Composer/SSH, SSL, storage, backups, cron and limits; NO-GO until verified.
- [x] Generate and commit genuine npm/Composer lockfiles from registry-backed GitHub Actions.
- [x] Add PHP2Shell CLI/web runtime gate, PHP policy unit tests, and Composer audit in CI.
- [ ] Verify patched runtime on actual cPanel independently for CLI and web SAPI.
- [ ] Verify app on a real Codespaces/local runtime and later an explicitly approved staging server.

**Stop:** Do not implement Phase 01 without approval.

## Phase 01 — Visual design and social dashboard (mock data)
**Status:** IMPLEMENTED ON FEATURE BRANCH, verification and publishing tracked in `docs/progress.md`.

- [x] Responsive 3-column desktop social shell and compact 5-tab mobile navigation.
- [x] Original visual system in documented green tokens and Lucide React.
- [x] Home, Tree Profile, dated Post Detail, Add Tree + Growth Update composer, illustrative Explore Map, User Profile, Notifications and 404 views.
- [x] Shared strictly typed fictional tree records, stable public IDs, author attribution, separate observed/published dates, no exact location.
- [x] Working demo controls: tree follow, post like/save/share, preview comment, filters, load more, local form preview, notification read.
- [x] GitHub Pages-safe hash navigation and scoped Vite bundle preview build workflow.
- [ ] Final merge, CI and live Pages verification: record the actual outcome in progress before marking full phase completion.

**Not implemented:** auth, Laravel/MySQL integration, real upload/GPS map, production deployment. Phase 02 awaits explicit owner approval.

## Phase 02 — Database foundations and real authentication
**Status:** NOT STARTED.

## Phase 03 — Register a tree (photos + location)
**Status:** NOT STARTED.

## Phase 04 — Growth updates and permanent tree timeline
**Status:** NOT STARTED.

## Phase 05 — Real feed, follows, comments, likes
**Status:** NOT STARTED.

## Phase 06 — GIS explorer and public-safe location filters
**Status:** NOT STARTED.

## Phase 07 — Community protection, moderation, notifications
**Status:** NOT STARTED.

## Phase 08 — PWA/Android + Capacitor native packaging
**Status:** NOT STARTED.

## Phase 09 — cPanel staging and authorized production hardening
**Status:** NOT STARTED.

## Phase 10 — iOS and separately approved post-launch features
**Status:** NOT STARTED.

See `AGENTS.md` for all acceptance requirements; this summary does not replace it.
