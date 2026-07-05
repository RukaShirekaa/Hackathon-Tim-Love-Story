-- ============================================================
-- Skema Supabase untuk Galeri Sasirangan
-- Jalankan di Supabase SQL Editor setelah membuat project.
-- ============================================================

-- 1. Tabel produk
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text not null default '',
  price        integer,                      -- rupiah; null = "Hubungi"
  image_url    text not null,
  category     text not null,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- 2. Row Level Security
alter table public.products enable row level security;

-- Publik boleh BACA semua produk
create policy "public read products"
  on public.products for select
  using (true);

-- Hanya user login (admin) boleh tulis/ubah/hapus
create policy "authenticated write products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 3. Storage bucket untuk foto (jalankan sekali)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Publik boleh baca file
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Hanya user login boleh upload
create policy "authenticated upload images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ============================================================
-- Buat akun admin: Dashboard Supabase > Authentication > Users
-- > "Add user" (email + password). Login pakai kredensial itu.
-- ============================================================
