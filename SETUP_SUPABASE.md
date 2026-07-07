# Setup Supabase + Deploy Vercel — SASIRA Store

Store + Admin CRUD pakai Supabase sebagai backend (Postgres + Storage). Web tetap static (Vite), di-serve Vercel — tanpa server sendiri.

---

## ⚠️ Keamanan — WAJIB baca

- **Publishable key** (`sb_publishable_...`) = aman untuk browser. Ini yang dipakai app (`VITE_SUPABASE_ANON_KEY`).
- **Secret key** (`sb_secret_...`) = akses penuh, bypass semua RLS. **JANGAN PERNAH** taruh di kode frontend, `.env.local` project ini, atau chat/commit.
- Jika secret key pernah bocor: **regenerate** di Supabase → Project Settings → API Keys.
- Login admin di app ini = password bersama sisi-klien (demo). Bukan keamanan sungguhan — siapa pun yang baca bundle bisa nulis DB via anon key. Cukup untuk hackathon. Upgrade nanti: Supabase Auth + RLS ketat.

---

## 1. Buat tabel `products`

Supabase Dashboard → **SQL Editor** → New query → paste → Run:

```sql
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  price numeric not null default 0,
  image_url text,
  badge text,
  created_at timestamptz default now()
);

alter table products enable row level security;

-- Demo: siapa pun boleh baca & tulis (cocok untuk hackathon).
create policy "public read"  on products for select using (true);
create policy "anon write"   on products for all    using (true) with check (true);
```

## 2. Buat Storage bucket `product-images`

Dashboard → **Storage** → New bucket:
- Name: `product-images`
- **Public bucket**: ON (biar gambar bisa diakses via URL publik)

Lalu policy upload untuk anon — **SQL Editor** → Run:

```sql
-- Boleh baca semua object di bucket
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Boleh upload (demo)
create policy "anon upload images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');
```

## 3. Isi `.env.local`

Copy `.env.example` → `.env.local`, isi:

```
VITE_SUPABASE_URL=https://njyokttsjxroptlbzizh.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxx   # publishable key, BUKAN secret
VITE_ADMIN_PASSWORD=ganti-password-ini
```

Restart dev server tiap ubah `.env.local`:

```
npm run dev
```

## 4. Test lokal

- `/` → landing (ada link **Store** di nav).
- `/store` → grid produk (kosong dulu).
- `/admin/login` → masukin `VITE_ADMIN_PASSWORD` → masuk `/admin`.
- Di `/admin`: tambah produk + upload gambar → muncul di `/store`.

## 5. Deploy Vercel

1. Push repo ke GitHub.
2. Vercel → New Project → import repo.
3. Framework: **Vite** (auto). Build `npm run build`, output `dist`.
4. **Environment Variables** — tambahkan 3 (sama seperti `.env.local`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
5. Deploy. `vercel.json` sudah rewrite semua route ke `index.html`, jadi refresh di `/store` atau `/admin` tetap jalan (no 404).
