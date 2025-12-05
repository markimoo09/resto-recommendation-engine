# Personalized Food Engine Recommendation

## The Pivot

### Original Idea

- A social review app that bases its recommendations for restaurants and cafes off Google Maps reviews and reviews from the circle
  - Genuinely a good idea! but it suffers from:
    - It's flat data; it doesn't actually understand your/the group's taste
    - If your friends haven't reviewed much, the app becomes almost empty
    - Recos stay "here are some places with reviews from your circle" vs. "here's the best place for us tonight"
    - Value proposition felt raw (Google Maps reviews + friends opinions)

### Enhanced Idea

- A personalized food recommendation engine for friend groups
  - Each user goes through onboarding to build a taste/allergy/preferences profile
  - When a group is formed, the app holds a collection of profiles
  - When someone asks "where should we eat tonight" it pulls the group profiles, maps data (and circle reviews), and makes a calculated recommendation

## Positioning

Project Kilo builds a **group taste graph** from each friend’s preferences, resolves conflicts automatically (diet, budget, distance), and returns “best-fit-for-us” places—not just popular or friend-reviewed lists. Google/Maps rank popularity; Kilo optimizes for **our group tonight**.

## Problem

- Endless “San tayo kakain?” debates
- Generic reviews that don’t match the group's preferences and taste
- Conflicts on budget, diet, distance, ambience
- Low trust in random reviews → decision fatigue

## Solution (essence)

1. Learn each person’s taste (vector per user) via quiz + light signals.
2. Aggregate into a **Group Taste Vector** with constraints (dietary must-pass, budget/distance caps) and weights.
3. Score nearby places (Maps data + your group history).
4. Return **Perfect Fits**, **Safe Options**, and one **Wildcard** with short reasons (“medium-spice ramen, quiet, within ₱450, 1.2 km”).

## Value Proof Examples

- 3 friends: two want ramen, one lactose-intolerant, budget ≤ ₱450, quiet vibe → Kilo surfaces 3 ramen spots with dairy-free options + quiet ambience tags.
- Mixed tastes: one prefers fried chicken, one vegetarian, one trying something new → 2 fusion spots that satisfy both, plus 1 “new-to-you” wildcard.

## Conflict Resolution (how it works)

- **Hard constraints:** dietary restrictions, budget ceiling, max distance must pass first.
- **Weighted prefs:** cuisine, spice, ambience, noise, novelty averaged with recency weighting.
- **Smoothing:** avoid repeating the same spot twice in a row unless explicitly favored.
- **Explainability:** each pick shows why it fits the group (“hits veg + lactose-free, mid-spice, under ₱450, 10 min away”).

## Novelty vs Safety Controls

- Default: 3 Perfect Fits + 2 Safe Options + 1 Wildcard.
- Toggle: “Safety-first” (no wildcard, tighter similarity) or “Explore” (boost novelty, but still respect hard constraints).
- Time-aware: if a group just explored last time, bias back to safe this session.

## MVP (4–6 weeks, clarity)

1. Onboarding quiz (cuisine, spice, ambience, budget, distance, diet; quick-skip available).
2. Import/fetch places via Google Places lookup + manual add; store basic metadata.
3. Group creation and a single CTA: “Where should we eat?”.
4. Simple scorer: hard constraints filter → weighted similarity → novelty penalty for repeats → return 3/2/1 set with reasons.
5. Lightweight feedback: thumbs up/down + tags (taste/ambience/service/price/noise) to update vectors.
6. Cold start: if no data, use popular-near-you by cuisine with group constraints; ask 2–3 one-tap preferences.

## Differentiation (explicit)

- Maps/Yelp/Foursquare sort by popularity and flat ratings; Kilo builds per-person vectors and reconciles conflicts for a group in real time.
- Explanations are group-specific (“why it fits us”), not generic star counts.
- Trust controls: weight friends > public; decay stale reviews; label sponsored picks clearly.

## Metrics to Validate the Essence

- **Decision success:** % of sessions where a group picks a suggested place within 3 taps/60 seconds.
- **Acceptance:** % of sessions where a Kilo suggestion is chosen (vs. manual override).
- **Choice friction:** median taps or “cycles” before a decision; goal: decrease over time.
- **Repeat rate:** groups returning weekly/biweekly to run the button.
- **Quality signals:** post-visit thumbs up/down rate by segment; delta vs. baseline popular-near-you.
- **Diversity control:** novelty used without drop in satisfaction (wildcard acceptance vs. dislike rate).

## Monetization (with trust guardrails)

- Early: unsponsored mode by default; if ads, label “Sponsored” and keep a non-sponsored feed.
- Later: featured slots, reservations commission, modes like Date/Work, premium filters; restaurant insights as a separate SaaS.

## Why This Can Win

- Universal pain (group dining choice) + no personalized group recommender today.
- Viral loop: group use pulls friends in.
- Defensibility: accumulated taste vectors + conflict-resolution logic become the moat.

## Technical Details

- Mobile: React Native (iOS/Android). Expo for tooling, Maps/location, push notifications.
- Auth/DB: Supabase Postgres + Supabase Auth with RLS; PostGIS for distance queries.
- Vectors: pgvector inside Supabase for taste vectors and restaurant/review embeddings. (If latency/scale demands later: move to managed Qdrant/Weaviate.)
- Backend: FastAPI service for recommendation logic and embeddings pipeline; Supabase functions for simple CRUD and events.
- Flow: Mobile calls FastAPI with group; FastAPI pulls user/group profiles + candidates from Supabase; apply hard constraints (diet/budget/distance), pgvector similarity for candidates, rerank with novelty/safety, return 3/2/1 with reasons.
- Embeddings: Use an embedding model (e.g., text-embedding-3-small) for restaurant/review text; store in pgvector; refresh nightly and on manual add.
- Cold start: popular-near-you by cuisine with constraints; 2–3 one-tap prefs to seed vectors; keep a safe fallback list.
- Feedback loop: thumbs up/down + tags update per-user vectors; recency-weighted; recompute group vector on demand.
- Privacy/trust: PII in Supabase with RLS; don’t log raw location history; label sponsored picks if ever enabled.
- Ops: Containerize FastAPI; Supabase cron/Edge Functions for nightly embedding refresh; feature flags for Safety-first vs Explore.

## User Journey Map

- **New user onboarding:** sign up with Supabase Auth → quick quiz (cuisine, spice, ambience, budget, distance, diet) with quick-skip → optional location permission → seed User Taste Vector.
- **Home & cold-start state:** see “Where should we eat?” CTA; if little data, show popular-near-you filtered by diet/budget/distance and ask 2–3 one-tap prefs.
- **Group creation:** create/select a group → invite friends (link/code); once a group exists, surface shared constraints (diet, budget, distance) and show group readiness.
- **Ask for a reco:** tap “Where should we eat?” → FastAPI fetches profiles, applies hard filters, runs pgvector similarity, reranks with novelty/safety → returns 3 Perfect Fits, 2 Safe Options, 1 Wildcard with reasons and distance/price badges.
- **Decision assist:** tap a reco to view details (map, price, cuisine, dietary tags, quiet/lively) → share to friends or open maps/booking.
- **Feedback loop:** thumbs up/down + tags after visit → updates personal vectors; group vector refreshes next ask; avoid back-to-back repeats unless favored.
- **Modes/controls:** toggle Safety-first vs Explore at decision time; sticky preference remembered per group session.
- **Return visits:** shortcut to recent groups; prefetch candidates; faster suggestions over time as vectors learn.

## Modules (aligned to the journey)

- **Auth & Profile:** Supabase Auth, profile store, onboarding quiz (cuisine/spice/ambience/budget/distance/diet), quick-skip, location permission capture.
- **Taste Modeling:** user taste vectors, recency weighting, dislike lists, novelty preference flag, post-feedback updater.
- **Groups & Invites:** create/select group, invite via link/code, group membership store, shared constraints (diet/budget/distance) display.
- **Places Data:** Google Places lookup + manual add, stored metadata (cuisine tags, price, distance, ambience, dietary tags), embeddings storage (pgvector).
- **Recommendation Engine:** hard constraint filter, pgvector candidate similarity, rerank with novelty/safety, 3/2/1 output with reasons and badges.
- **Modes & Controls:** Safety-first vs Explore toggle, sticky per session, fallback to safe if last session explored.
- **Decision & Detail Views:** reco list + reasons, detail page (map, price, tags, quiet/lively), share-to-friends, open maps/booking.
- **Feedback & History:** thumbs up/down + tags, recent group sessions, avoid back-to-back repeats unless favored; incremental vector updates.
- **Notifications:** group invites, “decision ready,” reminder to rate after visit, optional push setup via Expo/FCM/APNs.
- **Ops & Observability:** feature flags (e.g., wildcard on/off), cron/Edge Functions for nightly embedding refresh, metrics capture (decision success, acceptance, friction, repeat rate, quality, novelty acceptance).
