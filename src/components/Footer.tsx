import { Link } from "react-router-dom";
import { MessageCircle, MapPin, AtSign } from "lucide-react";
import { whatsappLink } from "../lib/format";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container-app grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
              <rect width="32" height="32" rx="7" className="fill-primary" />
              <g fill="none" className="stroke-accent" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M16 5 L27 16 L16 27 L5 16 Z" />
                <path d="M16 11 L21 16 L16 21 L11 16 Z" />
              </g>
            </svg>
            Sasirangan
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Kain sasirangan handmade khas Banjarmasin. Motif tradisional, warna
            alami, tiap helai dibuat dengan tangan.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Jelajah
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/galeri" className="transition-colors hover:text-primary">
                Galeri Produk
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Kontak
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <AtSign className="h-4 w-4" aria-hidden /> Instagram
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden /> Banjarmasin, Kalimantan Selatan
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="container-app text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Galeri Sasirangan. Dibuat untuk melestarikan
          warisan Banjar.
        </p>
      </div>
    </footer>
  );
}
