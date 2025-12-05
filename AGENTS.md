# Repository Guidelines

## Project Context

- Kilo is a group-focused food recommendation engine that builds per-user taste vectors, resolves group constraints (diet/budget/distance), and returns 3 Perfect Fits, 2 Safe Options, and 1 Wildcard with short reasons.
- Onboarding captures cuisine/spice/ambience/budget/distance/diet; feedback (thumbs + tags) updates vectors; modes include Safety-first (no wildcard) and Explore (boost novelty within constraints).
- Stack: React Native (Expo) app calling Supabase (Auth/Postgres/PostGIS/pgvector) and a FastAPI recommendation service; embeddings refreshed regularly; privacy-first (no raw location logging).

## Project Structure & Module Organization

- `app/` holds Expo Router screens; `(tabs)/` hosts the core flows (home/index, reco, review, journal, profile) with layout in `app/_layout.tsx`.
- `components/` contains reusable UI (themed text/view, haptic tab, parallax scroll, external link) and `components/ui/` for platform-specific icons.
- `constants/theme.ts` centralizes colors; `hooks/` contains theming/color-scheme helpers.
- `assets/` stores images/fonts; `scripts/reset-project.js` restores the starter scaffold; root configs include `eslint.config.js`, `tsconfig.json`, and Expo `app.json`.

## Build, Test, and Development Commands

- `npm install` — install dependencies.
- `npm run start` — start Expo dev server (choose device/simulator/Expo Go). Variants: `npm run ios`, `npm run android`, `npm run web`.
- `npm run lint` — run ESLint checks for the TypeScript/React Native codebase.
- `npm run reset-project` — move starter code to `app-example/` and create a blank `app/` (use with caution).

## Coding Style & Naming Conventions

- Language: TypeScript with React Native (Expo). Prefer functional components and hooks.
- Indentation: 2 spaces; strings: single quotes; keep imports ordered (libs → aliases → relatives) and use the `@/` alias for root paths.
- File naming: screen files follow Expo Router expectations (`app/(tabs)/reco.tsx`); shared components use kebab-case filenames with PascalCase exports.
- UI: favor existing themed components (`ThemedView`, `ThemedText`) and haptic tab wrapper to keep visuals/feedback consistent.

## Security & Configuration Tips

- Do not commit API keys or secrets; wire credentials via Expo configuration or environment files excluded from VCS.
- Verify third-party additions align with mobile footprint (bundle size, Expo compatibility) and respect platform permission prompts.
