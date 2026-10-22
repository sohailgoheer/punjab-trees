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
- [ ] Confirm actual cPanel PHP/extensions, MySQL/MariaDB, document root, Composer/SSH, SSL, storage, backups, cron and limits.
- [ ] Commit dependency lockfiles after a verified package install (no fabricated lockfiles).
- [ ] Verify app on a real Codespaces/local runtime and later an explicitly approved staging server.

**Stop:** Do not implement Phase 01 without approval.

## Phase 01 — Visual design and social dashboard (mock data)
**Status:** NOT STARTED for the new React application. Existing root HTML is only a separate legacy proof of concept.

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
