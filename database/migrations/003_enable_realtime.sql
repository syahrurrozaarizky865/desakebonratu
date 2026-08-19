-- Run once in Supabase SQL Editor after the schema and seed migrations.
-- Enables Postgres Changes so open clients receive changes immediately.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'berita', 'agenda', 'pengumuman', 'perangkat_desa', 'galeri', 'potensi',
    'surat_requests', 'penduduk', 'apbdes'
  ]
  loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = table_name
    ) then
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    end if;
  end loop;
end;
$$;
