<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Portal Desa Kebonratu

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
3. Run the app:
   `npm run dev`

## Supabase production setup

Run migrations in the SQL Editor in this order: `001_supabase_schema.sql`,
`003_enable_realtime.sql`, `006_sambutan_kepala_desa.sql`, then
`007_production_realtime_storage.sql`, `008_public_services_and_audit.sql`, and
`009_manage_rpjm_program.sql`.
Migration `002_seed_initial_data.sql` is
optional and should be skipped when you will enter real data yourself.

Create the first user in Supabase Authentication, then promote that account in
the SQL Editor with its UUID:

```sql
update public.profiles set role = 'admin' where id = '<AUTH_USER_UUID>';
```

Photos uploaded from the dashboard are stored in the public `desa-media`
Storage bucket. Realtime updates are delivered to other open browsers after
the database change is confirmed.

Migration 008 provides public tracking by tracking code, stores contact and
complaint form submissions, limits repeated submissions from one NIK for five
minutes, and records administrative data changes in `audit_log`.
