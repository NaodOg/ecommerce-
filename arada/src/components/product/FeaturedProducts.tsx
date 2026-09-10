"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  const products = useQuery(api.products.listProducts);

  if (products === undefined) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[3/4] bg-surface-container border border-outline-variant" />
        ))}
      </div>
    );
  }

  const featured = products.filter((p) => p.badge === "NEW").slice(0, 3);
  const shown = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {shown.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          price={product.price}
          image={product.image ?? ""}
          badge={product.badge}
          href={`/product/${product.slug}`}
        />
      ))}
    </div>
  );
}