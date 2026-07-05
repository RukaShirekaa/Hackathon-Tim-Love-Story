import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, MessageCircle, Share2 } from "lucide-react";
import type { Product } from "../lib/types";
import { formatPrice, whatsappLink } from "../lib/format";
import { useToast } from "./Toast";

const FALLBACK_IMAGE = "/images/sasirangan-teal.svg";

interface Props {
  product: Product;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  product,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasPrev) onPrev();
      else if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  async function share() {
    const url = `${window.location.origin}/galeri?produk=${product.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link produk disalin ke clipboard.");
      }
    } catch {
      // User cancelled sharing.
    }
  }

  return (
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="animate-fade-up relative z-10 flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card md:flex-row">
        <div className="image-fallback relative bg-muted md:w-3/5">
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={`Kain sasirangan ${product.name}`}
            onError={(event) => {
              if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="max-h-[45dvh] w-full object-cover md:h-full md:max-h-[90dvh]"
          />
          {hasPrev && <NavArrow side="left" onClick={onPrev} label="Produk sebelumnya" />}
          {hasNext && <NavArrow side="right" onClick={onNext} label="Produk berikutnya" />}
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {product.category}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
            {product.name}
          </h2>
          <p className="mt-1 text-xl font-semibold text-primary [font-variant-numeric:tabular-nums]">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={whatsappLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-on-primary transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" aria-hidden /> Tanya Produk
            </a>
            <button
              onClick={share}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-medium transition-colors hover:bg-muted"
            >
              <Share2 className="h-5 w-5" aria-hidden /> Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavArrow({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-2" : "right-2"
      } inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-background`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
