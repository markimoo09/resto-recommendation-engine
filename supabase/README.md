# Supabase Local Setup

## Prerequisites
- Docker Desktop running
- Supabase CLI installed (`npm i -g supabase` or see docs)

## Start
- From repo root: `supabase start`
- Check services: `supabase status` (shows API/Auth/DB URLs and keys)

## Stop
- From repo root: `supabase stop`

## Access the local database
- Supabase Studio (UI): http://127.0.0.1:54323
- psql: `psql postgres://postgres:postgres@127.0.0.1:54322/postgres` (default local creds/port)
- If the default connection string changes, use `supabase status --json` to copy the current DB URL.
