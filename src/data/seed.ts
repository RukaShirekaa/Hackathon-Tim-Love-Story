import type { Product } from "../lib/types";

// Seed produk contoh — foto batik/kain dari Unsplash (placeholder).
// Dipakai saat mode demo (tanpa Supabase) untuk mengisi galeri.
export const SEED_PRODUCTS: Product[] = [
  {
    id: "seed-1",
    name: "Kemeja Sasirangan Gigi Haruan",
    description:
      "Kemeja lengan panjang dengan motif Gigi Haruan klasik. Pewarnaan alami, jahitan rapi, nyaman dipakai harian maupun acara resmi.",
    price: 285000,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    category: "Kemeja",
    isFeatured: true,
    createdAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "seed-2",
    name: "Selendang Sasirangan Ombak Sinapur",
    description:
      "Selendang ringan bermotif ombak. Cocok sebagai pelengkap busana atau hadiah khas Banjar.",
    price: 145000,
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    category: "Selendang",
    isFeatured: true,
    createdAt: "2026-06-02T00:00:00.000Z",
  },
  {
    id: "seed-3",
    name: "Kain Lembaran Bintang Bahambur",
    description:
      "Kain sasirangan 2 meter, motif bintang bertaburan. Bebas dijahit sesuai selera.",
    price: 220000,
    imageUrl:
      "https://images.unsplash.com/photo-1606913419164-8b3a3f5a4f5f?auto=format&fit=crop&w=900&q=80",
    category: "Kain Lembaran",
    isFeatured: false,
    createdAt: "2026-06-03T00:00:00.000Z",
  },
  {
    id: "seed-4",
    name: "Outer Sasirangan Kambang Kacang",
    description:
      "Outer modern dengan sentuhan motif Kambang Kacang. Perpaduan tradisi dan gaya masa kini.",
    price: 320000,
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    category: "Outer",
    isFeatured: true,
    createdAt: "2026-06-04T00:00:00.000Z",
  },
  {
    id: "seed-5",
    name: "Selendang Sasirangan Naga Balimbur",
    description:
      "Motif naga khas Banjar dengan gradasi warna hangat. Pewarnaan tangan, tiap helai unik.",
    price: 165000,
    imageUrl:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80",
    category: "Selendang",
    isFeatured: false,
    createdAt: "2026-06-05T00:00:00.000Z",
  },
  {
    id: "seed-6",
    name: "Kemeja Sasirangan Daun Jaruju",
    description:
      "Motif daun jaruju yang teduh. Bahan katun adem, potongan slim fit.",
    price: 275000,
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    category: "Kemeja",
    isFeatured: false,
    createdAt: "2026-06-06T00:00:00.000Z",
  },
  {
    id: "seed-7",
    name: "Kain Lembaran Kulat Karikit",
    description:
      "Motif jamur kecil bertekstur halus. Warna earthy, cocok untuk busana formal.",
    price: 240000,
    imageUrl:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
    category: "Kain Lembaran",
    isFeatured: false,
    createdAt: "2026-06-07T00:00:00.000Z",
  },
  {
    id: "seed-8",
    name: "Tas Selempang Sasirangan",
    description:
      "Aksesori tas selempang berbalut kain sasirangan asli. Ringan dan fungsional.",
    price: null,
    imageUrl:
      "https://images.unsplash.com/photo-1548863227-3af567fc3b27?auto=format&fit=crop&w=900&q=80",
    category: "Aksesori",
    isFeatured: false,
    createdAt: "2026-06-08T00:00:00.000Z",
  },
];
