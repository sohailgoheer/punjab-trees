# AGENTS.md — TreeStory (working title)

> **Project:** Community-driven Tree Social Network / Living Tree Atlas  
> **Status:** Product specification and instructions for the GitHub-connected coding agent  
> **Version:** 1.0 — 22 October 2026  
> **Ownership:** User-controlled project; “TreeStory” is a **placeholder name**, not an approved final brand.  
> **Instruction:** Read this entire file before inspecting, changing, generating, or deploying code.

---

## 1. Your role and operating rules

You are the project's **senior full-stack engineer, GIS architect, security reviewer, QA engineer, and implementation assistant**. Build a high-quality social platform that documents the life of individual trees through photographs and dated observations. Work in the user's GitHub repository, one controlled milestone at a time.

### Mandatory agent behavior

1. **One phase / one clearly defined task per request.** Never implement the whole roadmap in one run. Do only the phase or task the user authorizes, plus essential repairs required to make that task work. Stop and report after each milestone.
2. **Inspect before editing.** Read `AGENTS.md`, `README.md`, `docs/progress.md`, `docs/decisions.md`, relevant code, and existing tests when present. Preserve completed work. Never overwrite functioning code merely to reorganize it.
3. **Never guess implementation status.** Distinguish *planned*, *implemented*, *tested*, *blocked*, and *deployed*. A mockup is not a real feature; a successful build is not a successful production deployment.
4. **Prefer a small, working vertical slice** over dozens of empty pages, unconnected components, or simulated backends. Each deliverable should have meaningful functionality and test coverage appropriate to the phase.
5. **Explain decisions clearly.** Communicate with the user in concise, easy-to-understand **Roman Urdu** by default. Write code, technical comments, API contracts, database field names, and documentation in **English**. Define unfamiliar technical terms briefly.
6. **No secret exposure.** Never print, commit, log, or screenshot production credentials, keys, OAuth secrets, database passwords, private access tokens, real user addresses, or private coordinates. Use `.env.example` with dummy values. If a secret is discovered, stop displaying it and recommend revocation/rotation.
7. **Ask only genuinely blocking questions.** Otherwise apply the approved specification and reasonable defaults. Do not ask again for product decisions already recorded here or in `docs/decisions.md`.
8. **Do not make irreversible production changes** (deploy, delete, reset a database, replace backups, publish app releases, change DNS, rotate credentials) without explicit permission. Never run destructive migrations on production.
9. **Never claim tests passed unless they ran.** Always report the commands executed and results. When infrastructure is unavailable, state exactly what could not be verified.
10. **Keep version-control changes reviewable.** Work on a descriptive branch when repository access permits, make scoped commits or a pull request when authorized, and summarize modified files. Never force-push or rewrite shared history without approval.
11. **Record progress** after each approved implementation step in `docs/progress.md` with date, finished work, test results, known issues, and the very next suggested task.
12. **Follow the latest explicit user instruction** where it changes the plan. Update the relevant architecture decision record, but warn first if the change threatens privacy, security, compatibility, or deployment.
13. **Check official documentation** before selecting major package versions, relying on unusual hosting features, or giving production commands. Pin compatible dependency versions and commit lockfiles.
14. **No fake success indicators:** do not fabricate users, trees, analytics, map points, API responses, screenshots, or production evidence. Labeled demo/seed data is allowed only in development and test environments.
15. **Avoid overengineering.** Start with cPanel-compatible PHP/MySQL/static assets. No mandatory Redis, Docker, Kubernetes, Node production server, Python worker, PostGIS, WebSockets, or paid cloud dependency in the MVP.

### Required format when completing a task

Report, in this order:
- **Completed:** exact feature/task delivered.
- **Files changed:** main files and why.
- **Verification:** exact tests/build/lint commands run; pass/fail/not-run.
- **Screens / usage:** how to inspect the feature locally, with paths or sample workflow.
- **Known issues:** limitations, environmental blockers, and security implications.
- **Git:** branch / commit / PR link, *only if actually created*.
- **Next step:** one narrowly scoped suggested task. **Do not start it without authorization.**

---

## 2. Product vision: a social network for individual trees

**Working title:** TreeStory. Final name, logo, domain and brand belong to the user and are undecided.

**Core principle: ONE PHYSICAL TREE = ONE CANONICAL TREE PROFILE = MANY DATED UPDATES.**

Users can register a newly planted or an already-existing tree with one or more photographs, optional species and attributes, an observation/planting date, and a geographical location. Later they or permitted community contributors can add new photographs and observations to **that same tree**, building a lifelong timeline. Updates are social posts that can appear in a reverse-chronological community feed while remaining attached to their tree's permanent profile.

### Example user story

- On 22 October 2026, Ali registers a neem tree, provides a photo, picks a location and records its condition.
- Six months later, Ali posts a dated growth photograph on that tree's profile.
- Another contributor, Sara, submits an update to the **existing tree**, pending appropriate permissions/moderation.
- Users can follow the tree, react, comment, open its growth timeline, and view its **privacy-safe approximate** map position.
- An update is **not** a new tree. A tree page is **not** just a filtered set of unrelated social posts.

### Main audiences

Individuals, students, families, tree enthusiasts, schools, community volunteers, parks and environmental organizations. Design for non-technical users first; GIS tools must feel approachable.

### MVP objective

Allow a real user to: sign up; create a tree with a photo and optional location; see that tree's permanent detail page; publish a subsequent dated photo update to the same tree; discover the new update in the feed; comment/follow; and explore a privacy-safe tree map on web/mobile-sized screens.

### Not in the MVP

Marketplace, tree sales, carbon-credit claims, accurate automated age/health measurement, AI species identification, IoT integrations, monetary rewards, mass image processing, complex organization workflows, live chat, live video, public precise home geolocation, or gamification that encourages trespassing. Document as possible later features, not launch requirements.

---

## 3. Product invariants: never break these

1. Every tree has a stable unique **public ID** (prefer ULID or similarly collision-resistant identifier) and a permanent shareable URL, independent of its display name.
2. Every tree has exactly one canonical database row; it may have many posts, observations, pictures, followers and optional authorized contributors.
3. Every dated tree update references an existing `tree_id` and a distinct `author_id`; do not duplicate tree master records for new updates.
4. Separate **when an event/photograph occurred** (`observed_at`) from **when the post was published** (`published_at` or `created_at`). Tree timeline sorts by observation date, community feed by publication date.
5. **Planting date is optional.** Some registered trees already exist and may have an unknown planting date. Never silently set `planted_at` to account registration time.
6. Exact GPS coordinates are sensitive. Store privately with appropriate access controls. Public endpoints return **generalized/approximate coordinates**, or omit location if privacy settings require it. Never expose exact residential/sensitive locations by default.
7. Uploaded photos must not disclose sensitive EXIF data. Remove GPS/location EXIF metadata before publishing optimized images.
8. Server-side policy checks enforce every protected action. UI buttons alone are never authorization.
9. Updates from unrelated users on another user's tree require authorization or **pending review**; no silent takeover of another user's tree identity.
10. A tree may be private, public-approximate, under review, hidden, inactive, or removed per explicit policies. Soft deletion/moderation should preserve auditability without leaking removed content.
11. A social media feature is complete only when its own data, permissions, validation, loading/error state, and tests are real.
12. Mobile and web use the **same backend business rules and API schema**. Do not implement separate inconsistent tree logic in mobile.

---

## 4. Approved baseline architecture — designed for cPanel

The initial deployment target is a **typical shared cPanel Linux hosting account**. Since this account's actual capabilities are unknown, verify them in Phase 0 before fixing major versions or deploying.

| Layer | Default stack | Reason |
|---|---|---|
| Web | React + TypeScript + Vite | Fast static production bundle; runs on Apache/cPanel without a Node server |
| Styling | Tailwind CSS, CSS variables, Lucide icons | Consistent responsive design, maintainable components |
| Data access | Typed API client, TanStack Query or equivalent | Pagination, mutation and caching without ad-hoc fetching |
| Forms | React Hook Form + Zod or equivalent | Reusable validation with server-side Laravel validation |
| Routing | React Router | Shareable tree/profile/post/map URLs |
| Android/iOS | Capacitor wrapping the same React web bundle | One frontend codebase; access camera/GPS/native capabilities |
| Backend | Supported Laravel version, **prefer Laravel 13 if hosting has PHP 8.3+** | PHP API compatible with cPanel |
| Database | MySQL 8-compatible relational schema | Likely available in cPanel; reliable associations |
| API auth | Laravel Sanctum | Stateful cookie+CSRF for first-party web; revocable bearer tokens for native mobile |
| GIS/map | Leaflet + configurable map tile provider | Low-cost web-capable interactive map |
| File storage | Laravel filesystem, local private/public partitions initially | CPanel-compatible; optional S3-compatible storage later |
| Emails | SMTP via Laravel Mail, when configured | Registration verification / password recovery |
| Jobs | Synchronous/simple DB jobs and cron-compatible schedules initially | Avoid requiring always-running workers on shared hosting |
| Testing | PHPUnit/Pest, Vitest/Testing Library, Playwright smoke flows | Backend/frontend/integration confidence |

### Important trade-offs

- A previous concept considered **Expo + PostgreSQL/PostGIS**. Do **not** quietly mix two competing implementations. For this project use **React/Vite + Capacitor + Laravel/MySQL** because the user wants cPanel hosting. Revisit only when verified hosting capabilities or explicit user choice justify it; record the decision.
- **Capacitor is not identical to a custom native React Native UI.** It packages the web interface with mobile access to camera/location; some platform-specific work, permissions and testing remain necessary.
- **The cPanel server hosts the website and API only.** Native Android/iOS installers are built separately using Android tooling and macOS/Xcode (or suitable authorized CI/macOS services), then distributed through normal app channels. Uploading React files to cPanel does **not** produce an APK, AAB or IPA.
- **No PostgreSQL/PostGIS requirement in MVP.** Store WGS84 latitude/longitude in ordinary MySQL numeric columns with indexes. Optimize common bounding-box queries; introduce optional supported native spatial indexes/functions only after confirming actual MySQL/MariaDB behavior. If large-scale spatial analysis later requires PostGIS, design a deliberate migration path rather than assuming cPanel supplies it.
- **No server-side Node runtime** may be assumed. Run the Vite build in development/CI; deploy `dist/` as static files.
- Do not assume cPanel grants SSH, shell Composer, custom Apache virtual hosts, subdomain docroot changes, symlinks, image extensions, long-running processes or cron. Check explicitly.

### Minimum environment to verify in Phase 0

- cPanel PHP version + required PHP extensions (Laravel 13 requires PHP 8.3+; fallback to a still-supported Laravel release only with recorded rationale and user approval if needed).
- MySQL/MariaDB version, DB creation access, storage and backup limits.
- Ability to set an API subdomain document root to Laravel **`backend/public`** while application code stays outside public web root.
- Composer availability (or controlled local dependency build/upload workflow), SSH optionality, scheduled tasks, SMTP support, SSL and HTTPS.
- Limits: file upload size, disk, bandwidth, PHP memory and execution timeout, CPU, image-processing extensions (GD/Imagick).
- Actual domain/hosting account information comes from the user or legitimate connected services; **never invent these details**.

---

## 5. High-level system design

```text
                    ONE PRODUCT / SHARED BUSINESS RULES

  Browser / Installable PWA      Android App           iOS App
  (React + Vite)                 (Capacitor)          (Capacitor)
             \                       |                     /
              \______________________|____________________/
                                     |
                         HTTPS / JSON API v1
                                     |
                     Laravel API + Sanctum + Policies
                        /                |           \
                MySQL database      Image storage    SMTP / Cron
                (users, trees,      (originals and    (optional
                 posts, etc.)        safe thumbnails)  MVP tasks)
                                     |
                         Leaflet map tile provider
                         (browser/mobile view layer)
```

### Suggested repository layout

```text
repo-root/
├── AGENTS.md                     # THIS FILE: coding agent instructions
├── README.md                     # How to run and what the app does
├── .gitignore
├── .github/workflows/ci.yml      # Add when CI is implemented
├── docs/
│   ├── architecture.md           # Hosting, topology, technical choices
│   ├── decisions.md              # Small dated architecture decision log
│   ├── roadmap.md                # Phase acceptance checklists
│   ├── progress.md               # Actual completion / testing status
│   ├── database.md               # ER model and migrations explained
│   ├── api-contract.md           # Endpoints, requests, errors and examples
│   ├── security-and-privacy.md   # Public/private location, media, policies
│   ├── deployment-cpanel.md      # Staging/prod release and rollback steps
│   └── ui-spec.md                # Screens, layout and design tokens
├── backend/                       # Standalone Laravel API application
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/                    # Only publicly served Laravel directory
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   ├── .env.example
│   └── composer.json
└── frontend/                      # React/Vite website + Capacitor shell
    ├── src/
    │   ├── app/                   # Router, providers, layouts
    │   ├── components/            # Accessible shared components
    │   ├── features/
    │   │   ├── auth/
    │   │   ├── feed/
    │   │   ├── trees/
    │   │   ├── timeline/
    │   │   ├── map/
    │   │   ├── social/
    │   │   ├── profile/
    │   │   └── moderation/
    │   ├── lib/                   # HTTP client, geo helpers, date utils
    │   ├── styles/
    │   └── types/
    ├── public/
    ├── tests/
    ├── android/                   # Native project, when initialized
    ├── ios/                       # Native project, when initialized
    ├── capacitor.config.ts        # When initialized; match built webDir
    ├── .env.example
    └── package.json
```

Keep native directories out until the authorized mobile milestone. Do not add a monorepo tool unless a concrete need appears.

---

## 6. Screen specification and interaction design

Aim for a modern, friendly, nature-inspired social product. The screenshot-driven concept is **Facebook-like organization, not a literal Facebook copy**; avoid imitating proprietary branding or UI assets.

### Desktop home feed (3-column)

- **Header:** working TreeStory logo/brand, global search, new tree action, notifications, user menu.
- **Left sidebar:** Home, Explore Trees, Map, My Trees, Saved Posts (later), Community (later), Profile, Settings.
- **Center column:** create-tree / create-update composer, tabbed Latest / Following feeds (Following can arrive later), social post cards, infinite-scroll or accessible Load More with cursor pagination.
- **Right sidebar:** real-only community counts, trending tree species (when data exists), recent contributors, nearby tree discovery (coarse location), simple tree-care information, community guidelines. Do **not** show invented production statistics.

### Mobile layout

- Sticky compact top bar; responsive single-column feed.
- Bottom navigation: **Home, Explore/Map, Add Tree, Activity, Profile**.
- Camera/gallery upload; geolocation permission only as necessary; manual map selection always possible.
- Full-width legible tree images; touch-sized controls; safe-area insets and keyboard handling.
- Same route meaning, data and permissions as desktop; platform-specific visual layout is okay.

### Initial required screens

1. **Welcome/Auth:** Sign in, sign up, password recovery, verified-email state, accessible errors.
2. **Home Feed:** Latest approved posts, real authors, associated tree, photo(s), time, comments/likes/follow.
3. **Register Tree:** Existing/newly-planted selector, photo, tree name (optional), species or Unknown, observed date, planting date if known, GPS/manual map pin, condition, description, privacy choice; confirmation and duplicate suggestion.
4. **Tree Detail:** Stable public ID, cover image, species and attributes, registered-by, privacy-safe location/map, follow tree, photo count, chronological timeline, owner/steward controls.
5. **Post/Update Detail:** Date and photographs, description, measurements, comments, likes and tree link.
6. **Add Growth Update:** Choose existing tree; photo, date, optional height/condition/notes; moderation preview as applicable.
7. **Tree Map:** Clustered privacy-safe tree pins, search/filter, open tree summary card; do not reveal exact addresses.
8. **User Profile:** Public display name/avatar/bio (opt-in), their trees and contributions, account settings.
9. **Notifications:** Basic database-backed notifications; no real-time WebSocket dependency in MVP.
10. **Moderation/Admin:** Review submitted updates, suspicious duplicates, reports and abusive content; protected behind policies.

### Visual standards

- **Working palette:** Forest green `#176B4D`, dark ink `#17221C`, sage `#EAF4EE`, warm off-white `#FAFBF8`, muted gray `#647067`, white `#FFFFFF`. Keep tokens centralized and adjust only when user approves visual changes.
- **Typography:** modern system font or legally hosted Inter; robust fallbacks; support eventual English/Urdu localization. Do not depend on externally loaded fonts for basic rendering.
- Cards should be consistent, with modest radius, subtle borders/shadows, visual hierarchy and sufficient whitespace.
- Responsive targets: small mobile (~360 px), regular mobile, tablet (~768 px), laptop and wide desktop. Test touch and keyboard navigation.
- Accessibility: meaningful alt text, associated labels, focus indicators, contrast, readable form validation, no critical information conveyed through color alone.
- Skeletons/loading states, empty states, permission-denied states, upload progress, retry UX and graceful API failure are mandatory when their features are implemented.
- Do not generate fake production maps with invented location or counts; use clearly marked development fixtures.

---

## 7. Domain model and relational schema

Implement **migrations, constraints, foreign keys, indexes, model policies and factories/tests**. These are conceptual table requirements; refine field names in `docs/database.md` before implementation.

### Essential tables

| Table | Key purpose / minimum fields |
|---|---|
| `users` | id, public username/handle, display_name, unique email, hashed password, avatar media, bio, email_verified_at, status, timestamps |
| `roles` / user role field | Minimum `member`, `moderator`, `admin`; tree-specific stewardship is **not** a global admin role |
| `tree_species` | id, optional common_name, scientific_name, local_name, taxonomy/verification status; unknown species allowed |
| `trees` | id, **public_id** unique, registered_by, steward/owner reference, optional species_id, display_name, description, new_planted/existing/unknown classification, planted_at nullable, first_observed_at, health/status, exact private lat/lng nullable, generalized public_lat/public_lng nullable, location_visibility, public location label, cover_media_id nullable, verification/moderation status, timestamps/soft delete |
| `tree_contributors` | tree_id, user_id, permissions/role, approved_by, approved_at; prevent duplicates |
| `tree_posts` | id, tree_id, author_id, post_kind (`registration`, `growth`, `observation`, `care`, etc.), text, **observed_at**, **published_at**, moderation_status, timestamps/soft delete |
| `tree_observations` | tree_post_id unique, height_cm nullable, trunk_circumference_cm nullable, health_condition nullable, other vetted structured data; values optional and units explicit |
| `media` | id, owner/user id, associated tree/post, server-controlled storage path, thumbnails, mime type, dimensions, file size, accessibility text, sort position, upload/processing status, timestamps |
| `tree_follows` | user_id + tree_id unique pair, timestamps |
| `post_likes` | user_id + tree_post_id unique pair, timestamps |
| `comments` | post_id, author_id, parent_id nullable if replies enabled, body, moderation status, timestamps/soft delete |
| `notifications` | recipient, type, payload with no secrets, read_at, timestamps |
| `reports` | reporter_id, target type/id, reason, status, reviewer/audit timestamps |
| `moderation_actions` | actor, target, action, reason, timestamps; restricted to moderator/admin |

Optional tables after MVP: `user_follows`, `bookmarks`, `tree_merge_requests`, `tree_care_events`, `organizations`, `organization_trees`, `badges`. Add only when scheduled.

### Design details

- `trees` and `tree_posts` are distinct entities. Registration normally creates the tree and its **first registration post in one database transaction**. A failed upload/transaction must not leave a broken master tree or orphaned public files.
- Provide indexes for `trees.public_id`, `trees.registered_by`, `tree_posts(tree_id, observed_at)`, `tree_posts(moderation_status, published_at)`, interactions' unique user/target pairs, and common geo filters.
- Keep exact WGS84 coordinates in **private columns**. A shared/public `TreeResource` must explicitly transform/omit location fields, never return the full Eloquent model by accident.
- Use `DECIMAL(10,7)` for latitude and `DECIMAL(10,7)` or equivalent for longitude initially; validate latitude `-90..90` and longitude `-180..180`. Avoid swapping coordinates between UI and backend.
- For public display, use a **consistent coarse generalization** (e.g., configurable map cell size around 300–500 m for non-public property) or no point at all. Avoid per-request random jitter that can reveal exact positions through repeated samples. Public map precision is a privacy policy decision, not a convenience round-to-6-decimals setting.
- For public parks / organization-managed sites, exact location publication requires an explicitly vetted workflow. Never default to publishing precise household geolocation or hidden photo EXIF GPS.
- Use nullable fields for unknown age, species and planting date. Clearly label estimates and manually-entered measurements.
- Validate observations to reject impossible values and use explicit units; never invent measurements or infer a tree's growth from photo alone.
- Use authorization policies for owner/steward update, approved-contributor update, moderation, hiding and deletion. Do not let the user change immutable creator/ownership fields through ordinary mass assignment.
- Implement a **duplicate suggestion** near an entered coordinate and matching species/time, but do not automatically merge: multiple real trees can grow close together. Admin-reviewed merge/alias flow belongs to a later phase.
- Keep DB schema portable across **the specific MySQL/MariaDB version confirmed by the host**. Spatial optimization is optional and must have tested fallback.

---

## 8. Business rules and social interaction

### Tree creation

1. Signed-in, appropriately verified user chooses **Newly planted** or **Existing tree**.
2. Capture/take/select a photo and optional attributes. Give a clear method to record *Unknown species* and *Unknown planting date*.
3. Ask for location only with consent. Support manual map pin, coarse/public setting, or skip when suitable.
4. Validate files and inputs on server; sanitize/transform images and remove EXIF GPS.
5. Suggest likely nearby existing trees without exposing exact owners' locations.
6. Create canonical tree + registration post + media association atomically, with cleanup on failure.
7. Navigate to the new permanent tree profile and show the new registration post in feed once published/approved.

### Update existing tree

1. User opens a tree page or selects an existing tree from searchable list.
2. User uploads one or more photos with observation date and optional measurements/notes.
3. Owner/steward may publish under policy; unrelated user submissions are queued for review/approval or refused by defined policy.
4. Upon approval, update appears in both its tree's timeline and the global/following feed.
5. Original post attribution remains intact. Old photos are never silently overwritten.

### Feed and interactions

- Global feed sorted by published time descending. Tree page timeline sorted by observation time with deterministic tie-breaking.
- Each post shows linked tree name/ID, author, photos, observation date, published date when useful, likes/comments and follow action.
- Support pagination (start with cursor-based or stable equivalent, 15–20 posts/page). Avoid fetching all posts or all images at once.
- Likes are one per user per post, idempotent toggles. Comments have real CRUD permissions, reporting and sensible length limits.
- A user may follow many trees, and a tree may have many followers. Following a tree is different from owning it.
- Display no invented counts in live environment. Recalculate or transactionally maintain cached counters only when justified.
- Require sensible rate limits for registration, uploads, commenting, liking and report submissions; prevent spam and automated bulk enumeration.

### Moderation and safety

- Users can report a tree/post/comment; admins can review, hide and restore content. Users can delete their own permitted content with clear downstream effects.
- Do not encourage users to enter private property, climb unsafe trees, visit hazardous roadsides or photograph identifiable people without consent.
- Avoid collecting unnecessary personal identity, exact public home addresses or exact movement history. Provide privacy policy/terms templates for legal review before public launch.
- Provide account data export/deletion plan and a retention/moderation policy before large-scale launch.
- Public user profile reveals only intentionally shared display info. Do not expose email, private coordinates, phone or authentication metadata.

---

## 9. API contract (versioned REST)

Use HTTPS JSON API under `/api/v1`. Document schemas, permissions, validation errors, pagination, query parameters and status codes in `docs/api-contract.md`. Prefer Laravel API Resources and Form Requests.

### Initial endpoint inventory

| Method | Path | Meaning / authorization |
|---|---|---|
| GET | `/api/v1/health` | Lightweight, sanitized API health indication |
| POST | `/register` and `/login` (web), appropriate native auth endpoints | Auth flows defined in Laravel/Sanctum documentation |
| POST | `/logout` | End current session / revoke current native token |
| GET | `/api/v1/me` | Authenticated current user's safe profile |
| GET | `/api/v1/feed` | Public approved posts, cursor and filters |
| GET | `/api/v1/trees` | Search/list approved visible trees |
| POST | `/api/v1/trees` | Register tree, authenticated; validates media references |
| GET | `/api/v1/trees/{publicId}` | Tree details with authorized field-level privacy |
| PATCH | `/api/v1/trees/{publicId}` | Steward/admin-approved editable fields only |
| GET | `/api/v1/trees/{publicId}/timeline` | Approved chronological observations/posts |
| POST | `/api/v1/trees/{publicId}/updates` | New dated update to **existing tree**; permission/review policy |
| POST / DELETE | `/api/v1/trees/{publicId}/follow` | Follow/unfollow, authenticated |
| GET | `/api/v1/posts/{postId}` | Approved post details |
| POST / DELETE | `/api/v1/posts/{postId}/like` | Like/unlike, authenticated |
| GET / POST | `/api/v1/posts/{postId}/comments` | List/create approved comments |
| PATCH / DELETE | `/api/v1/comments/{commentId}` | Author/moderator actions only |
| GET | `/api/v1/map/trees?bbox=...` | **Generalized public pins/clusters only**, strict limits |
| GET | `/api/v1/users/{handle}` | Public-safe profile and tree contributions |
| GET / PATCH | `/api/v1/notifications` | Recipient-only notifications and read states |
| POST | `/api/v1/reports` | Authenticated content flag/report |
| GET / POST | `/api/v1/moderation/...` | Moderator/admin only; documented actions |

Use `/sanctum/csrf-cookie` for same-first-party web SPA session bootstrap, per the exact Laravel version's docs. Native mobile tokens are separate from web cookies. Authentication endpoints may have different session/native formats; document this explicitly and test both.

### Response conventions

- Consistent `data` resource wrappers, pagination `meta`/`links`, stable IDs and UTC ISO-8601 timestamps; frontend formats to user locale.
- Validation returns useful field errors (normally HTTP 422); unauthorized 401, forbidden 403, not found 404, throttled 429, conflict 409 when appropriate. Do not leak the existence of private records through error messages.
- Filter user-supplied search/sort fields using allowlists; cap page size, bbox area, date range and upload counts.
- Prefer predictable API schemas over frontend-specific array shapes. No N+1 queries in feed/timeline/list APIs.
- Make mobile API base URL configurable. Never build production apps with `localhost`, development IP, or a secret hard-coded into frontend code.

---

## 10. Authentication, security, and privacy requirements

### Web authentication

- Use first-party **Sanctum stateful cookie sessions + CSRF protection** when React SPA and API share the same top-level domain (e.g. `example.org` and `api.example.org`). Configure stateful domains, secure cookies, CORS credentials, session domain and HTTPS correctly for actual deployed domains.
- Do **not** put permanent API bearer tokens in web `localStorage` as a substitute for Sanctum SPA sessions.

### Native authentication

- Use revocable, appropriately scoped/expiring mobile bearer tokens, stored via an audited native **secure storage** mechanism (Keychain / Android Keystore through a maintained plugin). Do not store long-lived tokens in plain localStorage or an unencrypted preferences store.
- Implement logout revocation, expired token handling and recovery. Test mobile origins/CORS separately rather than pretending native WebView requests are same-origin web browsers.

### Server-side controls

- Laravel Policies/Gates and route middleware on every protected endpoint; limit tree edits to authorized users and review others' submissions.
- Passwords via framework hashing; email verification, password recovery, rate limits, careful error messages.
- Validate MIME **and file content**, size, dimensions and ownership of uploads; rename files with generated IDs; reject executable content and unsupported formats. Never trust browser MIME/extension alone.
- Re-encode supported uploaded images, strip EXIF, create thumbnails and protect original/private media. If image libraries fail on hosting, show a safe error rather than publishing unprocessed GPS-tagged images.
- Safe rendering/escaping for captions, comments, names and URLs; no unchecked raw HTML from users. Use parameterized ORM queries; never construct SQL from unchecked user input.
- Use `APP_DEBUG=false` in production; `.env` stays outside public web root; hide stack traces, protect logs, no credentials in Git or error screens.
- HTTPS required on production; use restrictive CORS allowlist, security headers and sane cookie settings.
- Check dependencies for known vulnerabilities as part of the release process; do not automatically accept major dependency upgrades without compatibility testing.
- Never send owners' real private lat/lng in feeds, public tree resources, public GeoJSON, comments, logs, exports or share preview metadata.

### Web mapping / tile policy

- Leaflet renders coordinates, clusters and map interaction. Clearly attribute map data and tiles.
- Do not assume public OpenStreetMap standard tile servers are an unlimited production CDN. Follow the provider's usage policy, configure an approved scalable provider or self-host appropriately later, and **never bulk-prefetch or scrape** OSM tiles.
- Map requests show only permitted records, cap bounding-box/result size, and use coarse public coordinates so a user cannot reverse-engineer a private address by zooming/crawling.

---

## 11. Performance, code quality, and testing

### Engineering standards

- TypeScript `strict` mode; no casual `any`; typed requests/responses and runtime validation at trust boundaries.
- Laravel Form Requests, API Resources, services/actions for complex business logic, DB transactions, policies and scoped queries.
- Isolate domain logic from JSX/controller boilerplate. Write small components, hooks and reusable accessible UI primitives.
- Use conventional formatting/linting: ESLint + Prettier for frontend; Laravel Pint for backend; run supported test commands for changed code.
- Use migration and factory/seed scripts for sample data. Development-only seed data must be clearly labeled and never inserted into production by default.
- Include tests for an existing-tree update not creating a second tree, unauthorized edit rejection, moderation visibility, photo ownership, location privacy, feed order and same tree ID persistence.
- Tests should run in isolated test databases; never point destructive tests at the cPanel production DB.

### UX/performance targets (aspirational until measured)

- Mobile-first layout; compress responsive images and lazy-load below-the-fold media.
- Target visibly fast loading on common phones; use measurable Web Vitals and document actual measurements rather than claiming speed by guesswork.
- Avoid generating a huge social feed payload; start with 15–20 items/page and appropriate image variants.
- Cache stable species metadata and modestly cache safe public counts where useful, but do not require Redis for launch.
- Location/map queries filter by viewport plus server-side limits and spatial indexes/fallback; introduce clustering for dense areas.
- Gracefully handle limited upload bandwidth, intermittent mobile connections, denied camera/GPS, retries and duplicate taps.

### Minimum automated tests per subsystem

| Subsystem | Expected checks |
|---|---|
| Authentication | register/login/logout, protected APIs, role denial, token/session differences |
| Tree registration | valid/invalid fields, unknown species/date, location privacy, creation transaction |
| Timeline | multiple updates on ONE tree, author attribution, date ordering, moderation |
| Media | file validation, EXIF removal, failed upload cleanup, read authorization |
| Social | idempotent likes/follows, correct comment ownership, report action |
| Map | no exact private lat/lng in JSON/GeoJSON, bbox limits, geographic bounds |
| Frontend | route navigation, loading/error/empty states, keyboard/touch components |
| End-to-end | sign up → add tree → add later update → timeline → feed → follow/comment |

---

## 12. GitHub workflow and progress tracking

### Suggested conventions

- Branches: `feat/phase-01-ui-shell`, `feat/phase-02-auth`, `fix/location-privacy`, etc.
- Conventional commit subjects where practical: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
- Submit small PRs rather than monolithic unreviewable batches. Do not expose secrets through PR diffs, Actions logs or screenshots.
- Add CI checks once scaffolding is ready: frontend install/lint/typecheck/test/build; backend install/lint/tests; use supported PHP/Node versions in CI. Never connect CI tests to production credentials.
- Keep `package-lock.json` and `composer.lock` committed for reproducible installs.
- `README.md` must list local prerequisites, setup commands, test commands, project URLs and current implementation status. Avoid documentation that pretends features exist before they're coded.
- `docs/decisions.md` should capture a date, decision, reason, rejected alternative and compatibility consequence for major changes.
- `docs/progress.md` is the **source of truth** for what is actually implemented. Never automatically mark entire phases complete just because files exist.

### Standard progress record

```md
## YYYY-MM-DD — Phase NN / Task title
Status: IMPLEMENTED / TESTED / PARTIAL / BLOCKED
Changed: ...
Tests actually run: ...
Manual verification: ...
Open issues: ...
Next suggested task: ...
```

---

## 13. Delivery roadmap — complete phases strictly in order unless user changes priority

Each phase has **acceptance criteria**. Do not start the next phase in the same run.

### Phase 00 — Repo discovery, cPanel compatibility and architecture foundation

**Implement:**
- Inspect the actual repository and identify existing code; do not overwrite it.
- Create/normalize `README.md`, `docs/architecture.md`, `docs/decisions.md`, `docs/roadmap.md`, `docs/progress.md`, `.gitignore`, frontend/backend skeletons as appropriate.
- Confirm or explicitly list unknown cPanel prerequisites: PHP, DB engine, document root, Composer/SSH, SSL, storage, cron, image extensions.
- Record the React + Vite + Capacitor + Laravel/MySQL decision, with PHP-version fallback gate.
- Set up a minimal runnable frontend placeholder, Laravel API health endpoint, local `.env.example`, and basic smoke checks **only when dependencies/runtime are available**.
- Do **not** build user accounts, tree registration, social features or full mobile apps yet.

**Done when:** repo structure is understandable; basic local setup commands work or blockers are identified; backend and frontend skeletons remain deployable in principle; docs distinguish assumptions from verified host facts.

### Phase 01 — Visual system and social dashboard frontend (mock data only)

**Implement:** reusable responsive shell, header, desktop 3-column layout, mobile bottom tabs, tree post card, upload composer visuals, sample tree profile/timeline, profile shell, responsive navigation and accessibility. Use clearly marked fictional local fixtures.

**Done when:** a tester can navigate the key routes on desktop/mobile width; design looks polished; nothing pretends to be saved in a real database; lint/typecheck/build pass.

### Phase 02 — Database foundations and real authentication

**Implement:** DB migrations/users/roles/species/base trees/posts schema, Sanctum web registration/login/logout/reset/verification where SMTP flow is supported, protected `/me`, model factories/tests, typed frontend authentication integration. Native auth flow can be fully wired when native packaging is implemented, but design/test the API contract now.

**Done when:** real registration/auth works end-to-end in local development, session and CSRF behavior tested, protected resources deny unauthenticated users, migrations run on a clean dev DB, no secret leaks.

### Phase 03 — Register a tree (real photos + location)

**Implement:** verified user registration form, species/unknown/date selection, photo upload/re-encoding/EXIF removal, privacy-safe GPS/manual map pin, DB transaction, canonical tree detail route, duplicate candidate prompt, tests.

**Done when:** a real user can register exactly one persistent tree, upload photo, see its permanent ID/profile, and cannot expose a private precise location through public API.

### Phase 04 — Tree updates, individual timeline and photo history

**Implement:** add dated growth update to existing tree, multi-image observations, optional measurements, tree detail gallery, chronological timeline, owner/contributor authorization and pending-review flow.

**Done when:** multiple photos from different dates appear on **one tree ID** and unauthorized edits are prevented. Feed/timeline order difference is tested.

### Phase 05 — Real community feed and social interactions

**Implement:** approved global feed, pagination, tree-linked posts, likes, comments, follows, profile activity, loading/error states, server-side authorization and rate limiting.

**Done when:** a newly approved tree update appears in the feed with a working link to the same tree, and comments/likes/follows persist after refresh.

### Phase 06 — GIS tree explorer and filtering

**Implement:** Leaflet map, configurable tile source, bounding-box API, species/area/condition filters, privacy-safe markers, search and basic clustering, tests for map data leakage and scale.

**Done when:** users can browse existing visible trees on a responsive map without obtaining protected exact GPS, and map works without a paid key by default in approved dev usage.

### Phase 07 — Community protections and account quality

**Implement:** moderation queue, report management, notifications (initially poll-on-load), safe public profiles, account settings, ability to manage own trees/updates, admin audit logging, operational tests.

**Done when:** reported/spam content can be reviewed; non-admins cannot access admin APIs; basic account/privacy controls and realistic error states work.

### Phase 08 — PWA and Android packaging

**Implement:** reliable web installability, Capacitor setup, Android project, native camera/gallery and GPS permission handling, secure native token storage, device testing, release documentation.

**Done when:** same product flows work in browser and Android test build; no dev server is needed inside app; real API host is configurable; Android distribution prerequisites are documented.

### Phase 09 — cPanel staging, production hardening and deployment

**Implement:** frontend `dist` build, cPanel-compatible Laravel API deployment, configuration/permissions, staging DB migrations, storage behavior, SMTP and HTTPS, backups/restore exercise, security/performance smoke checks, release/runbook. Go live **only with explicit user permission**.

**Done when:** staging actually serves static React and Laravel over HTTPS, privacy rules pass, registration/photo/timeline/feed work on staging, backups are recoverable, rollback procedure documented. Production release is a separate explicit decision.

### Phase 10 — iOS and post-launch roadmap (later)

**Implement only on request:** iOS packaging/signing/testing, true device push notifications, tree QR tags, time-lapse slider, care reminders, contributors/organizations, AI-assisted species/health suggestions with confidence and human confirmation, verified public park inventory, advanced GIS/PostGIS migration if required.

**Done when:** specifically approved sub-feature meets its separately agreed tests and release criteria.

---

## 14. cPanel deployment rules and release runbook

**This section is a deployment plan, not proof that the actual hosting supports it.** Replace placeholder domain, user and paths only after verified with the owner. Verify the hosting provider's requirements and server runtime before attempting commands.

### Preferred hosting topology

```text
https://example.com/                 -> cPanel public_html/       -> STATIC React dist/
https://api.example.com/             -> /home/CPUSER/apps/treestory-api/public/
/home/CPUSER/apps/treestory-api/     -> Laravel project and .env, NOT web-accessible
MySQL database                      -> cPanel DB user with least necessary privileges
```

An alternate `app.example.com` frontend subdomain is acceptable. The Laravel subdomain document root **must target `public/`**, not the entire Laravel project directory. If this cannot be configured safely on current hosting, **report a blocker and propose a compatible hosting option**; do not expose the root or `.env` in `public_html`.

### Deployment preparation

1. Check cPanel PHP compatibility and required extensions; database version; composer/SSH access; upload limits; writable storage paths; cron; SSL; docroot configuration.
2. Create staging first. Keep staging data separate from production; seed demo data in dev/staging only, never silently in production.
3. Provision DB and least-privilege DB user, and `.env` stored outside public web root. Never commit `.env`.
4. Build React locally or in trusted CI: `npm ci && npm run build`; upload **contents of `frontend/dist/`** to intended web root. Do not upload `node_modules`, source secrets, or expect Node to execute on the server.
5. For Laravel, deploy application code outside web root. Where SSH/Composer is available and verified, install production dependencies with `composer install --no-dev --optimize-autoloader`. Otherwise prepare a compatible local build/upload strategy explicitly; do not assume Composer exists in every account.
6. Set production `APP_ENV=production` and `APP_DEBUG=false`; configure exact HTTPS `APP_URL`, DB, SMTP, session stateful/cookie/CORS domains, image storage and upload limits. Generate `APP_KEY` **once at initial installation** and preserve it in secure backups. Never regenerate for an existing live app.
7. Back up DB and files before each migration. Run reviewed schema migrations with `php artisan migrate --force` only on the intended authorized environment; never `migrate:fresh` or `db:wipe` on staging/production.
8. Apply correct secure `storage/` and `bootstrap/cache/` permissions and run supported optimization commands (`php artisan optimize`) after correct production configuration. Do not use insecure world-writable blanket permissions.
9. Verify image storage/public URL behavior. `storage:link` may be restricted on shared hosting; if so, implement an explicitly safe alternative and retest **before** launch. Keep private originals private.
10. If scheduled tasks are needed, set a permitted cPanel cron to call the Laravel scheduler; do not rely on always-running queue workers/WebSocket servers. Start with a modest work queue strategy and monitor runtime limits.
11. Test HTTPS, SPA deep-link refresh, auth cookies/CSRF, API CORS, mobile API requests, file uploads, image processing, private GPS omission, `APP_DEBUG`, security headers, response codes, logs, backups and rollback procedure.
12. Only after staging passes, get explicit release approval and deploy to production. Keep previous build/backup for rollback.

### Static SPA deep links under Apache

A conditional `.htaccess` rewrite may be needed so direct links like `/trees/01...` open React. Example (test against actual Apache rules):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

Do not place this generic SPA rewrite in the Laravel API's `public/` directory; Laravel manages its own routing. Be mindful of static assets and real directories.

### Build environments

- **Web:** build generated static assets; cPanel web server serves them.
- **Backend:** supported PHP + MySQL on cPanel; production tasks via supported CLI/cron capabilities.
- **Android:** Capacitor sync plus Android Studio/SDK or trusted Android CI; produce APK/AAB according to distribution method.
- **iOS:** Xcode/macOS or approved macOS build infrastructure; code signing and app store procedures are separate from cPanel.
- **SEO/social share previews:** a static React SPA alone may not give rich dynamic metadata to all crawlers. Plan public tree share-preview/meta route or approved pre-render strategy before marketing launch; do not assume it works automatically.

### Release checklist

- [ ] Domain/DNS/SSL verified (no invented production URLs)
- [ ] Correct PHP/version/extensions and DB provisioned
- [ ] Laravel project + `.env` not web accessible
- [ ] APP_DEBUG disabled; all cookies/tokens secure
- [ ] DB/files backup performed and restore method checked
- [ ] Migrations reviewed and approved
- [ ] Web static build serves and SPA routes refresh
- [ ] Auth registration/login/logout and password reset tested
- [ ] Image upload/re-encoding/EXIF removal tested on actual host
- [ ] Tree registration/update/timeline/feed/comment/follow checked
- [ ] Public API and GeoJSON do not expose private exact coordinates
- [ ] Admin/moderation API access denied to ordinary users
- [ ] Mobile API origins and credentials behavior verified
- [ ] Error pages/logs contain no secret or internal paths
- [ ] Backup, rollback and incident owner documented
- [ ] User explicitly approved production release

---

## 15. Future opportunities (record only, do not implement prematurely)

- **Tree Time Machine:** comparison slider, seasonal/yearly photo timelines, growth collage/video using user images.
- **Scan-to-profile QR labels:** visitor scans a code on an authorized public-space tree and sees its record.
- **Tree Guardians:** owners can invite verified caretakers to add dated observations; approvals, transparency and attribution.
- **Tree Community Challenges:** low-risk participation and educational challenges with abuse-resistant verification; do not incentivize unsafe locations/actions.
- **Organization dashboard:** schools/parks monitor their own trees, survival follow-ups, maintenance work orders and statistics.
- **GeoAI assist:** suggest species, broad visual condition, visible change from images; store confidence and require human review; do not imply medically/agronomically certain conclusions.
- **Advanced GIS:** heat maps, tree survival estimates *only when evidence permits*, city/park inventories, web map filters, optional MySQL spatial indexes/PostGIS service after hosting upgrade.
- **Multilingual UI:** English first, then optional Urdu / Arabic with proper RTL handling.
- **Open data export:** organization-owner-authorized only, license-defined, filtered to avoid private coordinate leakage.

---

## 16. Immediate first assignment to the coding agent

When the owner first adds this file to GitHub and tells you to begin, **perform ONLY PHASE 00**.

Suggested owner message:

> Read the root `AGENTS.md` completely and treat it as our product and engineering specification. Start **Phase 00 only**: inspect the repository without losing any existing work, document the architecture and unknown cPanel prerequisites, scaffold the minimum React/Vite and Laravel applications if the environment permits, add local setup instructions and run the available smoke checks. Update `docs/progress.md` with genuine results. Do not build Phase 01 or any tree/social feature yet. Report all changed files, test commands, blockers and the single next task in Roman Urdu.

**Final reminder:** this is a living system for documenting **real trees over years**. Protect the canonical tree identity, honest observation chronology, contributor attribution, public location privacy, cPanel compatibility, and the step-by-step workflow above everything else.