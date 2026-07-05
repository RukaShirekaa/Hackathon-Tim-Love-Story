import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-black text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary transition-opacity hover:opacity-90"
      >
        <Home className="h-5 w-5" aria-hidden /> Kembali ke Beranda
      </Link>
    </div>
  );
}
