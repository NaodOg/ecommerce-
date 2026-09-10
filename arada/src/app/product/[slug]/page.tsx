"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductOrderPanel } from "@/components/product/ProductOrderPanel";
import Link from "next/link";
import { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const products = useQuery(api.products.listProducts);
  const product = products?.find((p) => p.slug === slug);

  useEffect(() => {
    if (products !== undefined && !product) {
      router.replace("/drops");
    }
  }, [products, product, router]);

  if (!product) {
    return (
      <>
        <TopAppBar />
        <main className="flex-1 flex items-center justify-center min-h-screen bg-background">
          <p className="font-mono text-sm text-outline uppercase tracking-widest">Loading...</p>
        </main>
      </>
    );
  }

  const soldOut = product.badge === "SOLD OUT";
  const image = (product.image ?? "").replace("w=600", "w=1400");

  return (
    <>
      <TopAppBar />
      <main className="flex-1 flex flex-col lg:flex-row bg-background">
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="relative w-full max-w-xl aspect-[3/4] overflow-hidden bg-surface-dim border border-outline-variant">
            {image ? (
              <img
                src={image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-outline uppercase">
                No image
              </div>
            )}
            {product.badge && (
              <div className="absolute top-3 right-3">
                <span className="bg-background border border-secondary text-secondary font-mono text-[10px] px-2 py-1 uppercase">
                  {product.badge}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-outline-variant p-6 flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="font-display text-3xl text-on-surface uppercase tracking-tighter mt-1">
              {product.name}
            </h1>
            <p className="font-mono text-sm text-on-surface-variant mt-1 uppercase tracking-widest">
              {product.price}
            </p>
          </div>

          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          <div className="h-px bg-outline-variant" />

          <ProductOrderPanel
            product={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image ?? "",
              category: product.category,
              description: product.description,
            }}
            soldOut={soldOut}
          />

          <Link
            href="/drops"
            className="font-mono text-xs text-outline uppercase tracking-widest hover:text-secondary transition-colors"
          >
            &larr; Back to shop
          </Link>
        </div>
      </main>
    </>
  );
}