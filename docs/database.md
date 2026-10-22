# Database plan — not yet implemented

**Phase 00 status:** Schema is conceptual; zero database migrations have been created or run.

The approved future relational model is described in `../AGENTS.md` section 7:

- `users`, roles, `tree_species`, `trees`, `tree_contributors`.
- `tree_posts` with `tree_id`, `author_id`, `observed_at` and `published_at`.
- `tree_observations`, `media`, `tree_follows`, `post_likes`, `comments`, `notifications`, `reports`, `moderation_actions`.

Non-negotiable future rules:

1. One canonical `trees` record for one real tree; subsequent posts reference it, not duplicate it.
2. Planting date is nullable. Observed time and publication time remain separate.
3. Exact location is private and public outputs are generalized or omitted.
4. Transactions, foreign keys, indexes, media ownership, policy tests, and migration rollback review.

Database engine and actual cPanel MySQL/MariaDB version are **unverified**. Do not select server-specific spatial features or create production databases in Phase 00.
