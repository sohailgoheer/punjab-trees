# TreeStory architecture (Phase 00)

Status: **Architecture recorded; integration NOT deployed**. Read `../AGENTS.md` before implementation.

## Baseline

```text
Web browser (React / TS / Vite static build)        Future Android / iOS (Capacitor)
                         \                         /
                          HTTPS JSON REST API v1
                                    |
                         Laravel 13* / Sanctum
                                    |
                       MySQL or compatible MariaDB
                                    |
                    Controlled file/media storage
```

`*` **Laravel 13 is conditional:** only use if the target cPanel host supports PHP >=8.3 and the required extensions; otherwise assess a supported Laravel 12 fallback with owner approval and retesting. No production version is finalized from a guess.

- Hosting: cPanel Apache serves the **built** React static assets. No Node server runs in production.
- API: Laravel application files stay outside public web root; only `backend/public` is publicly served by an API subdomain.
- Database: MySQL 8-compatible relational schema; real MySQL vs MariaDB version is unverified. No PostGIS dependency.
- Mapping: Leaflet planned, tile provider chosen later. Public tree map data must use coarse locations or omit coordinates.
- Mobile: Capacitor wraps the **same** React code, added in Phase 08, not Phase 00. Native bundles need separate platform builds.
- Auth: Sanctum stateful cookies with CSRF for first-party website; secure revocable native tokens for future apps.
- Storage: Laravel filesystem, safe image re-encoding and EXIF GPS removal are future phases; no user media implemented yet.
- Testing: frontend static smoke tests, typed build; backend Laravel API health test; database/auth tests only when their phase is implemented.

## Canonical data rules

**ONE PHYSICAL TREE = ONE TREE PROFILE + MANY TREE POSTS / PHOTOS.**

- Stable public tree identifier and permanent URL.
- Each subsequent update attaches to the **same** tree ID and retains independent author attribution.
- `observed_at` (when photographed) differs from `published_at` (when submitted).
- Unknown species and planting date are valid; do not auto-fill unknown planting dates.
- Exact GPS is private. Public map returns generalized coordinates (or nothing) and media EXIF GPS is removed before publishing.

## Deployment topology (illustrative, not configured)

```text
https://example.com/       -> public_html/                -> frontend/dist/ built contents
https://api.example.com/   -> /home/CPUSER/apps/treestory-api/public/
                                  /home/CPUSER/apps/treestory-api/ (outside web root)
DB                               -> cPanel MySQL/MariaDB, private least-privilege user
```

Actual host, domain, deployment privileges, versions and document roots are **unknown** until verified.

## Existing work preserved

The root `index.html`, `post.html`, `styles.css` and `app.js` are an earlier standalone public HTML demo. They are **not** part of the React/Vite or Laravel applications. They remain untouched for continuity. Future Phase 01 must deliberately migrate/remove demo usage after approval, not silently overwrite it.

See [cPanel host requirements](deployment-cpanel.md), [architecture decisions](decisions.md), [preview](preview.md).
