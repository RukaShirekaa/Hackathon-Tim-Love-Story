# SASIRA - Inovasi Street Wear Sasirangan

Situs web dinamis untuk SASIRA, sebuah brand UMKM yang mengangkat kain batik sasirangan khas Kalimantan ke dalam produk streetwear modern seperti oversized t-shirt, bomber jacket, dan hoodie yang berani serta siap dipakai harian.

Proyek ini dibangun menggunakan arsitektur modern berbasis React dan terintegrasi penuh dengan Supabase sebagai sistem backend tanpa server untuk manajemen produk.

---

## Fitur Utama

### 1. Integrasi Supabase dan CRUD Panel Admin
* Autentikasi Pengelola: Halaman login admin yang aman menggunakan sistem pencocokan kata sandi berbasis enkripsi satu arah (SHA-256).
* Manajemen Produk Lengkap: Panel khusus admin untuk menambah, melihat, memperbarui, dan menghapus (CRUD) item produk secara real-time.
* Unggah Gambar Dinamis: Upload asset gambar produk secara langsung ke bucket penyimpanan Supabase Storage (product-images).
* Penanganan State Aplikasi: Manajemen otomatis untuk skeleton loading, daftar produk kosong, dan indikasi kegagalan koneksi database.

### 2. Efek Parallax 3D Card ala Aceternity UI
* Efek Kemiringan Dinamis: Kartu produk merespons arah gerakan kursor mouse menggunakan transformasi CSS 3D (perspective, rotateX, dan rotateY).
* Pemisahan Lapisan Kedalaman (Parallax): Elemen di dalam kartu produk memiliki tingkat kedalaman (translateZ) yang berbeda untuk memberikan efek mengambang nyata:
  * Gambar produk terangkat setinggi 100px.
  * Label badge terangkat setinggi 120px di atas gambar.
  * Nama produk berada pada kedalaman 50px.
  * Tombol aksi dan harga berada pada kedalaman 70px.
* Proyeksi Bayangan: Bayangan dinamis disematkan langsung pada elemen gambar produk saat di-hover untuk memperkuat ilusi melayang.

### 3. Mesin Pencari Gooey (Gooey Search Engine)
* Input Elastis (Gooey Input): Fitur kolom pencarian di navbar halaman Store yang memanfaatkan filter SVG feGaussianBlur dan feColorMatrix. Kolom input melebar secara elastis dari tombol kuning saat mendapatkan fokus.
* Filter Real-time: Menyaring daftar katalog produk secara langsung berdasarkan nama, kategori, atau deskripsi saat pengguna mengetik.
* Penanganan Pencarian Kosong: Menyediakan tampilan umpan balik khusus jika tidak ada produk yang cocok dengan kata kunci pencarian.

### 4. Transaksi Melalui WhatsApp (WhatsApp Checkout)
* Integrasi Pesanan Langsung: Menekan tombol keranjang belanja pada kartu produk akan otomatis membuka ruang obrolan WhatsApp menuju nomor pengelola (+62 822-8793-0695).
* Templat Pesan Otomatis: Pesan WhatsApp diformat secara dinamis berdasarkan data produk yang dipilih, berisi nama produk, kategori, dan harga untuk mempermudah transaksi.

### 5. Halaman Utama dan Katalog Store Terpisah
* Homepage: Menampilkan persis 3 produk unggulan berdasarkan badge khusus (BEST SELLER, TRENDING, NEW ARRIVAL) untuk menjaga fokus kurasi produk utama. Sektor pemisah border-top dihilangkan agar latar belakang menyatu sempurna.
* Halaman Katalog Store (/store): Halaman khusus yang memuat seluruh inventaris produk lengkap dengan saringan pencarian dan latar belakang khusus (backround3.jpg) dengan gradasi kontras gelap untuk keterbacaan teks.
* Tombol Navigasi Tengah: Tombol "Lihat Semua Produk" diposisikan secara terpusat di tengah bawah grid produk homepage untuk mengarahkan pengguna ke katalog lengkap.

### 6. Desain Header Navigasi dan Footer Premium
* Perbaikan Anchor Scroll: Target ID scroll Home dipindahkan ke pembungkus elemen utama (main) untuk memastikan halaman bergeser kembali ke posisi teratas viewport secara akurat.
* Tautan Navigasi: Navigasi Store pada halaman utama diatur untuk menggulir ke bagian bawah halaman secara halus, sementara akses ke katalog penuh dilayani oleh tombol tengah.
* Footer Streetwear: Bagian bawah website kini dilengkapi dengan footer bertema gelap yang elegan, memuat deskripsi brand, navigasi halaman (tautan admin disembunyikan demi keamanan), serta kontak sosial media (Instagram: hidayathul_fikri, TikTok: @barzzly, WhatsApp).

---

## Detail Animasi dan Interaksi

Seluruh gerak animasi dibangun secara manual menggunakan CSS murni dan JavaScript berbasis requestAnimationFrame untuk menjaga performa optimal.
* Parallax Pointer: Background hero dan model utama bergeser mengikuti koordinat mouse menggunakan properti CSS kustom --mx dan --my.
* Ink Reveal: Judul panggung utama muncul dengan transisi clip-path, blur, dan efek skew saat halaman dimuat.
* Collapse Navbar: Navigasi atas otomatis menyusut dari lebar penuh menjadi bentuk pil kaca melayang (glassmorphism) saat halaman digulirkan ke bawah.
* Split-Text: Karakter teks ABOUT US terurai per huruf dan muncul dengan efek shimmer emas secara berurutan.

---

## Teknologi yang Digunakan

* React 19
* React Router DOM v7
* Vite
* Supabase JS Client
* CSS Vanilla (Tanpa framework eksternal)
* Oxlint (Linter)
* Web Crypto API (Autentikasi SHA-256)
