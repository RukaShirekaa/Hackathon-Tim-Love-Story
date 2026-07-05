import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, PackageOpen, SearchX } from "lucide-react";
import type { Product, Category } from "../lib/types";
import { CATEGORIES } from "../lib/types";
import { getProducts } from "../lib/db";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Lightbox from "../components/Lightbox";

type Filter = "Semua" | Category;
const FILTERS: Filter[] = ["Semua", ...CATEGORIES];

export default function Gallery() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filter, setFilter] = useState<Filter>("Semua");
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    document.title = "Galeri Produk — Sasirangan";
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  // Deep link: ?produk=<id> membuka lightbox setelah data siap.
  const activeId = params.get("produk");
  const active = useMemo(
    () => (products && activeId ? products.find((p) => p.id === activeId) ?? null : null),
    [products, activeId],
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const okCat = filter === "Semua" || p.category === filter;
      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  }, [products, filter, query]);

  const idx = active ? filtered.findIndex((p) => p.id === active.id) : -1;

  function open(p: Product) {
    params.set("produk", p.id);
    setParams(params, { replace: true });
  }
  function close() {
    params.delete("produk");
    setParams(params, { replace: true });
  }
  function goto(p: Product) {
    params.set("produk", p.id);
    setParams(params, { replace: true });
  }

  return (
    <div className="container-app py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
          Galeri Produk
        </h1>
        <p className="mt-3 text-muted-foreground">
          Jelajahi koleksi kain sasirangan kami. Klik foto untuk melihat detail.
        </p>
      </header>

      {/* Kontrol: search + filter */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau motif..."
            aria-label="Cari produk"
            className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-base outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={on}
                className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition-colors ${
                  on
                    ? "border-primary bg-primary text-on-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid / states */}
      <div className="mt-10">
        {products === null ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={PackageOpen}
            title="Belum ada produk"
            text="Galeri masih kosong. Produk akan tampil di sini setelah admin menambahkannya."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Tidak ada hasil"
            text="Coba ubah kata kunci atau pilih kategori lain."
          />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
              Menampilkan {filtered.length} produk
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={open} />
              ))}
            </div>
          </>
        )}
      </div>

      {active && (
        <Lightbox
          product={active}
          hasPrev={idx > 0}
          hasNext={idx >= 0 && idx < filtered.length - 1}
          onClose={close}
          onPrev={() => goto(filtered[idx - 1])}
          onNext={() => goto(filtered[idx + 1])}
        />
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof PackageOpen;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
