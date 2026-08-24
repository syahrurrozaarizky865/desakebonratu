-- Jalankan sekali di Supabase SQL Editor untuk memperbarui bucket yang sudah ada.
-- Batas 500 MB berlaku untuk foto dan video galeri.
update storage.buckets
set
  public = true,
  file_size_limit = 524288000,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
where id = 'desa-media';
