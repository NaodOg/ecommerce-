import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  badge?: string;
  href: string;
}

export function ProductCard({ name, price, image, badge, href }: ProductCardProps) {
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
        {badge && (
          <div className="absolute top-2 right-2">
            <span className="bg-background border border-secondary text-secondary font-mono text-[10px] px-2 py-1 uppercase">
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-display text-lg text-white">{name}</h3>
          <span className="font-mono text-xs text-secondary">{price}</span>
        </div>
        <span
          className={cn(
            "w-full bg-background border border-secondary/30 text-white font-mono text-xs py-3 uppercase transition-all text-center",
            "group-hover:bg-primary-container group-hover:border-primary-container",
          )}
        >
          {badge === "SOLD OUT" ? "SOLD OUT" : "ORDER NOW"}
        </span>
      </div>
    </Link>
  );
}