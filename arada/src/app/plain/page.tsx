"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { ProductCard } from "@/components/product/ProductCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const categories = ["all", "tees", "hoodies", "accessories"];

const steps = [
  { n: "01", title: "Pick your blanks", text: "Tees, hoodies, totes. Every piece cut and sewn in-house." },
  { n: "02", title: "Set the quantity", text: "No minimums. Bulk price kicks in at 10+ pieces per style." },
  { n: "03", title: "We cut & sew", text: "Finished garments with heavy fabric and bar-tacked seams." },
  { n: "04", title: "Your label, done", text: "Clean stock that carries your brand — or sell it as is." },
];

export default function PlainPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const products = useQuery(api.products.listPlainProducts);

  const filtered = products
    ? activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <>
      <TopAppBar />
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <div className="px-4 md:px-12 pt-8 md:pt-12 max-w-[1440px] mx-auto w-full">
          <div className="border border-outline-variant bg-surface-dim px-6 md:px-12 py-10 md:py-16 relative overflow-hidden">
            <div className="absolute top-4 right-4 font-mono text-sm text-secondary tracking-widest opacity-70">
              B2B / PLAIN GOODS
            </div>
            <span className="font-mono text-sm text-secondary uppercase tracking-widest">
              GARMENT SHOP &middot; WHOLESALE
            </span>
            <h1 className="font-display text-4xl md:text-[80px] uppercase tracking-tighter text-white glow-text leading-none mt-3">
              YOUR LABEL.
              <br />
              OUR BLANKS.
            </h1>
            <p className="font-body text-lg md:text-lg text-on-surface-variant max-w-xl mt-4 leading-relaxed">
              We cut, sew and finish plain garments for brands, stockists and
              anyone who sells clothing. No print, no graphics — just clean,
              heavyweight pieces ready to carry your name.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 font-mono text-sm md:text-xs text-on-surface-variant uppercase tracking-widest">
              <span className="border border-outline-variant px-3 py-1.5">Made to order</span>
              <span className="border border-outline-variant px-3 py-1.5">No minimums</span>
              <span className="border border-outline-variant px-3 py-1.5">Bulk @ 10+</span>
              <span className="border border-outline-variant px-3 py-1.5">Sewn in-house</span>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-12 py-8 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
            {steps.map((s) => (
              <div key={s.n} className="border border-outline-variant bg-surface-container p-5 flex flex-col gap-2">
                <span className="font-mono text-sm text-secondary tracking-widest">{s.n}</span>
                <h3 className="font-display text-lg text-white uppercase tracking-tighter">{s.title}</h3>
                <p className="font-body text-base text-on-surface-variant leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-[64px] uppercase tracking-tighter text-white leading-none">
                PLAIN STOCK
              </h2>
              <p className="font-mono text-sm text-on-surface-variant mt-2 tracking-widest uppercase">
                {products === undefined ? "..." : `${filtered.length} PIECES`}
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
                priceHidden
                href={`/product/${product.slug}`}
              />
            ))}
          </div>

          {products !== undefined && filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-display text-xl text-on-surface-variant uppercase tracking-tighter">No plain stock here</p>
              <p className="font-mono text-sm text-outline uppercase tracking-widest mt-2">Check back next drop</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}