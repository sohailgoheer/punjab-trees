# TreeStory visual design and interaction specification

**Phase:** 01 social dashboard, **implemented as a frontend-only demonstration on 24 October 2026**. **TreeStory is a working name, not final branding.**

## Design direction

A nature-inspired, original three-column social interface, familiar to social media users **without copying Facebook's branding, layout pixels, or proprietary graphics**.

### Tokens

| Token | Value / role |
|---|---|
| Forest | `#176B4D` primary interactive color |
| Dark forest | `#0E4633` focus/hover and secondary green |
| Ink | `#17221C` main text |
| Sage | `#EAF4EE` interactive backgrounds |
| Warm canvas | `#FAFBF8` body background |
| Muted | `#647067` secondary text |
| White | `#FFFFFF` cards and surfaces |
| Border | `#E5EBE5` clean separation |
| Font | System UI/Inter fallback with Georgia for editorial display typography |
| Icons | Lucide React with accessible labels and visible text |

All style tokens are centralized in `frontend/src/styles.css`.

### Desktop (three-column)

- Sticky header with product wordmark, global search, add-tree action, activity/notification control and fictional account avatar.
- Left rail: home, explore trees, add tree, profile, notifications, illustrative map, future saved/community/settings links. Sidebar stays within the scrollable desktop viewport.
- Center: welcome banner, three story highlights, composer link, Latest/Following feed tabs, post-kind filters, 5-item Load More and full social cards. Each post references a permanent tree ID and has its own photo-update detail route.
- Right rail: counts **computed from labelled fixtures**, sample popular species, current fixture activity and general tree-care guidance. No invented production analytics.
- Feed cards: fictional author, tree link, `observedAt` separate from `publishedAt`, image, broad city, demo likes/comment count, save/share action.

### Mobile

- Sticky compact top bar, optional search bar toggle, single-column readable feed, same routes/business meaning.
- Fixed five-item bottom tab bar: **Home, Explore, Add, Activity, Profile**, with safe-area padding and touch targets.
- Reduced image/card density for ~360px phones; center column fills available width, desktop rails do not crowd mobile.
- No GPS or camera permission requested in Phase 01.

### Screens and routes

| Hash route | Screen | Implemented demo interaction |
|---|---|---|
| `#/` | Home feed | Latest/Following tabs, growth/planting/care filters, Load More, click to tree/post |
| `#/trees/:publicId` | Canonical tree profile | Hero, species, owner, unknown planting date, observed-time photo timeline, follow/unfollow and photo selection |
| `#/posts/:postId` | Dated update detail | Post author/tree link, photo, observation/publication dates, fixture comments + temporary typed comment |
| `#/add-tree` | Add tree UI | Newly planted/existing/update modes, species/unknown, planting date optional, observed date, broad city, file-name selection, privacy choice, confirmation preview |
| `#/add-tree?update=:id` | Update tree composer | Choose an existing permanent tree ID, photo/date/note inputs, **no saved post** |
| `#/explore` | Stylized map explorer | Interactive **non-geographic** sample markers (CSS percentages only), search and species filter, tree links |
| `#/profile` | Fictional user profile | Tree list, user's updates, saved posts (session-only) |
| `#/notifications` | Fictional notifications | Open linked tree/post, mark one or all read in React state |
| Unmatched route | Not found | Back to feed |

Routing uses **React Router HashRouter for this static GitHub Pages preview**. Hash URLs require no Apache rewrites; later cPanel staging can reassess BrowserRouter after routing/deep-link testing.

### Canonical fixture contract (Phase 01 only)

- `frontend/src/types/models.ts`: typed `TreeRecord`, `TreePost`, `TreeComment`, `Person`, `Notice`.
- `frontend/src/data/fixtures.ts`: **6 fictional tree profiles, 15 fictional dated posts, sample authors and comments**. Image URLs are illustrative stock photography, **not evidence of the specific species or real observation**.
- `frontend/src/lib/collections.ts`: selector functions for unique tree IDs, authorship, reverse-chronological publication feed vs observation-date tree timeline, search and metrics.
- Location fields contain **approximate city names only**. Map layout coordinates are arbitrary percentages within an illustration; **they are not real latitude/longitude, and must never be converted into public GPS coordinates**.
- Exact planting date remains nullable on the existing Amaltas tree. Dates of observing and publishing are distinct.
- Cards, tree profiles, posts, and the explorer all derive from the **same** shared fixture records.

### Demo-only and safety boundaries

All content visibly declares itself fictional or demo. UI likes/follows/bookmarks, notification reads and typed comments live in ephemeral **React memory only** and reset on reload. The Add Tree form reads **photo filename only** and creates a **preview confirmation**; file bytes are not uploaded or permanently stored. No account, MySQL record, Laravel API, GPS permission, EXIF metadata, backend auth, real user or photo upload feature is implemented.

The production architecture from `AGENTS.md` remains **React/Vite + future Capacitor + Laravel 13/MySQL on patched PHP 8.4.27+ (8.4.x only)**. Nothing in Phase 01 authorizes deploying unverified cPanel PHP.

### Accessibility and verification

- Labelled nav groups, descriptive buttons, meaningful photo alt text (explicitly illustrative), visible focus outline, touch-sized controls, captions and status/toast region.
- Native input `required`/date/type constraints where useful; text fields have associated labels. The user can select a privacy preference without submitting GPS.
- React Testing Library route and interaction checks; Vitest fixture invariants; original Node smoke tests; ESLint, strict TypeScript and Vite build.
- Image links require internet access to Unsplash. CSS keeps a graceful muted background if external images fail. The photos are not stored in this repo.
- **Not part of Phase 01:** real server auth/registration, persistence, photo/EXIF processing, mapped geographical pins, notifications API, moderation policies or Capacitor project.

## Acceptance vs Phase 02

Phase 01 only proves a polished, navigable mock UI. **Phase 02** is a separate, approval-gated backend database and authentication implementation. Do not treat visual state as durable data.
