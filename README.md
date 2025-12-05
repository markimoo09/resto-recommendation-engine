# Kilo

Kilo is a group-focused food recommendation engine that builds a personal taste vector for each member, respects group constraints, and returns a set of choices you can act on quickly. Every recommendation explains why it fits.

## What it does

- Onboarding captures cuisine, spice tolerance, ambience, budget, distance, and diet preferences.
- Feedback (thumbs + tags) continually updates each person’s taste vector.
- Group resolver applies shared constraints (diet/budget/distance) and returns 3 Perfect Fits, 2 Safe Options, and 1 Wildcard with short reasons.
- Modes: Safety-first (no wildcard) and Explore (boost novelty while honoring constraints).
- Privacy-first: no raw location logging; only derived constraints are stored.

## Architecture

- React Native app using Expo Router for navigation and theming helpers for consistent UI.
- Supabase for Auth, Postgres/PostGIS/pgvector storage, and embeddings refresh.
- FastAPI recommendation service that computes and ranks options from user vectors and constraints.

## Project structure

- `app/`: Expo Router screens; `(tabs)/` hosts core flows (home, reco, review, journal, profile); layout in `app/_layout.tsx`.
- `components/`: reusable UI (themed text/view, haptic tab, parallax scroll, external link); `components/ui/` holds platform-specific icons.
- `constants/theme.ts`: centralized colors; `hooks/`: theming/color-scheme helpers.
- `assets/`: images and fonts.
- `scripts/reset-project.js`: moves starter code to `app-example/` and recreates a blank `app/` (use cautiously).
- Root configs: `eslint.config.js`, `tsconfig.json`, Expo `app.json`.

## Development

Install dependencies:

```bash
npm install
```

Start the app (choose device/simulator/Expo Go when prompted):

```bash
npm run start
```

Shortcuts:

- `npm run ios` / `npm run android` / `npm run web` to target a platform directly.
- `npm run lint` for TypeScript/React Native linting.
- `npm run reset-project` to restore the starter scaffold (destructive to `app/`).

## Usage notes

- Prefer functional components and hooks; keep imports ordered (libs → aliases → relatives) and use the `@/` alias for root paths.
- Use existing themed components (`ThemedView`, `ThemedText`) and haptic tab wrapper for visual and feedback consistency.
- Do not commit API keys or secrets; wire credentials through Expo config or env files excluded from VCS.
