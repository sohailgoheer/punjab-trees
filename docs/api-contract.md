# API contract — Phase 00 only

**Version:** provisional REST JSON v1. No authenticated endpoints or persistence are implemented.

## GET /api/v1/health

Defined in `backend/routes/api.php` and registered through Laravel `bootstrap/app.php`. Designed to return HTTP 200:

```json
{"data":{"status":"ok","service":"treestory-api"}}
```

- No credentials, DB metadata, hostname, version or secret should appear in the response.
- This route is only operational when Composer dependencies are installed and Laravel actually boots.
- The GitHub Pages site **cannot execute** this endpoint.
- A PHP syntax check does not prove API HTTP behavior. Run an actual Laravel feature test / request on a compatible runtime before marking it verified.

All future endpoints (auth, tree canonical profiles, observations, feed, comments, moderation, public-safe map) are **planned only** in `AGENTS.md`. Do not implement them in Phase 00.
