import type { Product } from "../lib/types";
import { formatPrice } from "../lib/format";

interface Props {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-shadow duration-200 hover:shadow-card focus-visible:shadow-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={`Kain sasirangan ${product.name}`}
          loading="lazy"
          width={900}
          height={1125}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
          {product.category}
        </span>
        {product.isFeatured && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent">
            Unggulan
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 font-semibold text-primary [font-variant-numeric:tabular-nums]">
          {formatPrice(product.price)}
        </p>
      </div>
    </button>
  );
}
