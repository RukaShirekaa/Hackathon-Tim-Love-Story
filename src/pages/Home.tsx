import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Hand, Leaf, Sparkles } from "lucide-react";
import type { Product } from "../lib/types";
import { getProducts } from "../lib/db";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Lightbox from "../components/Lightbox";

const WHY = [
  {
    icon: Palette,
    title: "Motif Khas Banjar",
    text: "Gigi Haruan, Ombak Sinapur, Naga Balimbur — tiap motif punya makna warisan.",
  },
  {
    icon: Hand,
    title: "Dibuat dengan Tangan",
    text: "Teknik jelujur dan celup tradisional. Tiap helai unik, tidak ada yang sama persis.",
  },
  {
    icon: Leaf,
    title: "Warna Alami",
    text: "Pewarnaan dengan bahan alami menghasilkan warna hangat yang tahan lama.",
  },
  {
    icon: Sparkles,
    title: "Kualitas Terjaga",
    text: "Bahan katun pilihan, jahitan rapi, nyaman dipakai harian maupun acara resmi.",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState<Product[] | null>(null);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => {
    document.title = "Galeri Sasirangan — Kain Tradisional Khas Banjar";
    getProducts()
      .then((all) => {
        const f = all.filter((p) => p.isFeatured);
        setFeatured((f.length ? f : all).slice(0, 4));
      })
      .catch(() => setFeatured([]));
  }, []);

  const idx = active ? (featured ?? []).findIndex((p) => p.id === active.id) : -1;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-foreground/60" />
        </div>

        <div className="container-app flex min-h-[78dvh] flex-col justify-center py-20 text-on-primary">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Warisan Kalimantan Selatan
          </p>
          <h1 className="animate-fade-up mt-4 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.95] tracking-tight">
            Keindahan Kain Sasirangan
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-on-primary/90">
            Galeri kain sasirangan handmade khas Banjar. Motif tradisional, warna
            alami, dibuat dengan tangan oleh pengrajin lokal.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3">
            <Link
              to="/galeri"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-primary shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Lihat Galeri <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <a
              href="#kenapa"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-on-primary/40 px-6 py-3 font-semibold text-on-primary transition-colors hover:bg-on-primary/10"
            >
              Kenapa Sasirangan?
            </a>
          </div>
        </div>
      </section>

      {/* KENAPA */}
      <section id="kenapa" className="container-app scroll-mt-20 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Kenapa Sasirangan?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Bukan sekadar kain — tiap lembar membawa cerita, teknik turun-temurun,
            dan sentuhan tangan pengrajin Banjar.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <w.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {w.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIEW GALERI */}
      <section className="container-app pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Koleksi Pilihan
            </h2>
            <p className="mt-3 text-muted-foreground">
              Beberapa karya unggulan dari galeri kami.
            </p>
          </div>
          <Link
            to="/galeri"
            className="hidden shrink-0 items-center gap-1.5 font-semibold text-primary transition-colors hover:text-accent sm:inline-flex"
          >
            Semua produk <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setActive} />
              ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            to="/galeri"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary"
          >
            Lihat Semua Produk <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </section>

      {active && featured && (
        <Lightbox
          product={active}
          hasPrev={idx > 0}
          hasNext={idx < featured.length - 1}
          onClose={() => setActive(null)}
          onPrev={() => setActive(featured[idx - 1])}
          onNext={() => setActive(featured[idx + 1])}
        />
      )}
    </>
  );
}
