# UI guidelines — Phase 00 and future scope

Working name: **TreeStory**. Final name/logo/domain is an owner decision.

## Phase 00

- `frontend/src/App.tsx` renders a real React placeholder with clearly labelled foundation status; no social interactions or fabricated metrics.
- Palette: forest `#176B4D`, dark ink `#17221C`, sage `#EAF4EE`, off-white `#FAFBF8`, muted gray `#647067`, white.
- Design: system font (no external font dependency), accessible contrast/focus, responsive one- or three-column content as space allows.
- No login/map/upload elements until their approved phase. A placeholder must not suggest they are functional.

## Phase 01 / later — not implemented

- Original Facebook-like social organization without copying brand assets: desktop 3-column layout; mobile single-column feed and bottom navigation.
- Tree feed post, tree detail and dated timeline, clear contributor attribution, comments, icons, status and map links.
- GPS consent, manual position and public location privacy choices.
- Upload progress, keyboard/touch states, errors, loading and empty states; usable on narrow (~360 px) mobile through desktop.
- Only real server-backed data in production. Development fixtures must be visibly labelled.
