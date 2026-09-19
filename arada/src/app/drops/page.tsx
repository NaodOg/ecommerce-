"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const categories = ["all", "plain", "tees", "hoodies", "outerwear", "pants", "accessories"];

export default function DropsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const products = useQuery(api.products.listProducts);

  const filtered = products
    ? activeCategory === "all"
      ? products
      : activeCategory === "plain"
        ? products.filter((p) => p.plain)
        : products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <>
      <TopAppBar />
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <div className="px-4 md:px-12 py-8 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-[80px] uppercase tracking-tighter text-white glow-text leading-none">
                ALL PRODUCTS
              </h1>
              <p className="font-mono text-sm text-on-surface-variant mt-2 tracking-widest uppercase">
                {products === undefined ? "..." : `${filtered.length} ITEMS`}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 font-mono text-sm uppercase tracking-widest transition-all",
                    activeCategory === cat
                      ? "bg-primary-container text-white"
                      : "border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image ?? ""}
                badge={product.badge}
                plain={product.plain}
                bulkPrice={product.bulkPrice}
                bulkMin={product.bulkMin}
                href={`/product/${product.slug}`}
              />
            ))}
          </div>

          {products !== undefined && filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-display text-xl text-on-surface-variant uppercase tracking-tighter">No products</p>
              <p className="font-mono text-sm text-outline uppercase tracking-widest mt-2">Nothing here yet</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
