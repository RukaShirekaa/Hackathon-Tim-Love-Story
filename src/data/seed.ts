import type { Product } from "../lib/types";

// Seed produk contoh dengan asset lokal supaya galeri tetap aman saat offline.
// Dipakai saat mode demo (tanpa Supabase) untuk mengisi galeri.
export const SEED_PRODUCTS: Product[] = [
  {
    id: "seed-1",
    name: "Kain Sasirangan Sutra Gigi Haruan",
    description:
      "Kain Sasirangan berbahan sutra eksklusif dengan motif Gigi Haruan klasik khas Banjar. Pewarnaan alami, sangat lembut, elegan untuk acara formal.",
    price: 425000,
    imageUrl:
      "/images/sasirangan-teal.svg",
    category: "Kain Sutra",
    isFeatured: true,
    createdAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "seed-2",
    name: "Kain Sasirangan Katun Kambang Kacang",
    description:
      "Bahan katun primissima dengan motif Kambang Kacang yang melambangkan keharmonisan. Nyaman, adem, dan menyerap keringat.",
    price: 185000,
    imageUrl:
      "/images/sasirangan-amber.svg",
    category: "Kain Katun",
    isFeatured: true,
    createdAt: "2026-06-02T00:00:00.000Z",
  },
  {
    id: "seed-3",
    name: "Kain Sasirangan Satin Ombak Sinapur",
    description:
      "Kain Sasirangan dengan bahan satin semi-sutra yang berkilau mewah. Bermotif Ombak Sinapur bergelombang indah.",
    price: 275000,
    imageUrl:
      "/images/sasirangan-coral.svg",
    category: "Kain Satin",
    isFeatured: true,
    createdAt: "2026-06-03T00:00:00.000Z",
  },
  {
    id: "seed-4",
    name: "Selendang Sasirangan Naga Balimbur",
    description:
      "Selendang panjang dengan motif legendaris Naga Balimbur. Dibuat dengan teknik jelujur tangan yang sangat detail.",
    price: 145000,
    imageUrl:
      "/images/sasirangan-indigo.svg",
    category: "Selendang",
    isFeatured: true,
    createdAt: "2026-06-04T00:00:00.000Z",
  },
  {
    id: "seed-5",
    name: "Kain Sasirangan Katun Bintang Bahambur",
    description:
      "Kain katun 2 meter bermotif Bintang Bahambur dengan gradasi warna biru indigo alam. Cantik untuk kemeja pria maupun rok wanita.",
    price: 195000,
    imageUrl:
      "/images/sasirangan-slate.svg",
    category: "Kain Katun",
    isFeatured: false,
    createdAt: "2026-06-05T00:00:00.000Z",
  },
  {
    id: "seed-6",
    name: "Kain Sasirangan Sutra Kulat Karikit",
    description:
      "Kain sutra premium bermotif Kulat Karikit dengan warna alam kecokelatan. Halus, jatuh dengan indah, serta memberikan kesan mewah.",
    price: 450000,
    imageUrl:
      "/images/sasirangan-teal.svg",
    category: "Kain Sutra",
    isFeatured: false,
    createdAt: "2026-06-06T00:00:00.000Z",
  },
  {
    id: "seed-7",
    name: "Kain Sasirangan Satin Daun Jaruju",
    description:
      "Kain satin lembut berpola Daun Jaruju tradisional dengan sentuhan warna hijau bumi. Ideal untuk dress atau busana resmi.",
    price: 280000,
    imageUrl:
      "/images/sasirangan-amber.svg",
    category: "Kain Satin",
    isFeatured: false,
    createdAt: "2026-06-07T00:00:00.000Z",
  },
  {
    id: "seed-8",
    name: "Kain Sasirangan Katun Ramak Sahang",
    description:
      "Kain katun bermotif tradisional Ramak Sahang dengan latar merah bata yang hangat. Dikerjakan handmade oleh pengrajin Banjarmasin.",
    price: 175000,
    imageUrl:
      "/images/sasirangan-coral.svg",
    category: "Kain Katun",
    isFeatured: false,
    createdAt: "2026-06-08T00:00:00.000Z",
  },
];

