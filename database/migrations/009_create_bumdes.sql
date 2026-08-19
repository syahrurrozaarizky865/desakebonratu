-- 009_create_bumdes.sql

CREATE TABLE IF NOT EXISTS public.bumdes (
  id text PRIMARY KEY,
  nama text NOT NULL,
  jenis_usaha text,
  deskripsi text,
  alamat text,
  kontak text,
  pemilik text,
  gambar text,
  latitude numeric,
  longitude numeric,
  inserted_at timestamptz DEFAULT now()
);

-- Optional: grant select to anon if needed
-- GRANT SELECT ON public.bumdes TO anon;