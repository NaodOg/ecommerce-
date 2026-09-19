import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  badge?: string;
  href: string;
  plain?: boolean;
  bulkPrice?: string;
  bulkMin?: number;
  priceHidden?: boolean;
}

export function ProductCard({
  name,
  price,
  image,
  badge,
  href,
  plain,
  bulkPrice,
  bulkMin,
  priceHidden,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="bg-surface-container flex flex-col group border border-outline-variant hover:border-secondary/50 transition-colors"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {(badge || plain) && (
          <div className="absolute top-2 right-2">
            <span className="bg-background border border-secondary text-secondary font-mono text-sm px-2 py-1 uppercase">
              {badge ?? "PLAIN"}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-lg text-white leading-tight">{name}</h3>
            {!priceHidden && (
              <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest block mt-1">
                {plain && bulkPrice && bulkMin
                  ? `From ${formatPrice(bulkPrice)} @ ${bulkMin}+ pcs`
                  : "Made to order"}
              </span>
            )}
          </div>
          {!priceHidden && (
            <span className="font-display text-lg md:text-xl text-secondary shrink-0">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <span
          className={cn(
            "w-full bg-background border border-secondary/30 text-white font-mono text-sm py-3 uppercase transition-all text-center",
            "group-hover:bg-primary-container group-hover:border-primary-container",
          )}
        >
          {badge === "SOLD OUT"
            ? "SOLD OUT"
            : priceHidden
              ? "CHECK FOR PRICING"
              : plain
                ? "ORDER WHOLESALE"
                : "ORDER NOW"}
        </span>
      </div>
    </Link>
  );
}