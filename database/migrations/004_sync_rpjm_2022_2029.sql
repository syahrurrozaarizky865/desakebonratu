-- Menyelaraskan data aparatur dengan Dokumen Perubahan RPJM Desa Kebonratu
-- Tahun 2022-2029, Bab II halaman 19.
-- Jalankan setelah 002_seed_initial_data.sql bila database sudah berisi data contoh.

update public.perangkat_desa
set
  nama = case id
    when 'pd1' then 'A. Guruh Tajul Arasy'
    when 'pd2' then 'Nasrullah'
    when 'pd3' then 'Mohamad Idris'
    when 'pd4' then 'Rudi Hartono'
    when 'pd5' then 'Elis Novianti'
    when 'pd6' then 'Amaryadi'
    when 'pd7' then 'Madamin'
    when 'pd8' then 'Samani'
    else nama
  end,
  jabatan = case id
    when 'pd1' then 'Kepala Desa Kebonratu'
    when 'pd2' then 'Sekretaris Desa'
    when 'pd3' then 'Kepala Urusan Tata Usaha dan Umum'
    when 'pd4' then 'Kepala Urusan Keuangan'
    when 'pd5' then 'Kepala Urusan Perencanaan'
    when 'pd6' then 'Kepala Seksi Pemerintahan'
    when 'pd7' then 'Kepala Seksi Kesejahteraan'
    when 'pd8' then 'Kepala Seksi Pelayanan'
    else jabatan
  end,
  kategori = case when id in ('pd1', 'pd2', 'pd3', 'pd4', 'pd5', 'pd6', 'pd7', 'pd8') then 'Pemerintah Desa' else kategori end;

-- Entri pd9-pd10 adalah data contoh dan tidak tercantum dalam dokumen RPJM.
delete from public.perangkat_desa where id in ('pd9', 'pd10');
