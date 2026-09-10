"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  const orders = useQuery(api.orders.listOrders);
  const products = useQuery(api.products.listProducts);

  const pending = orders?.filter((o) => o.status === "pending") ?? [];
  const totalOrders = orders?.length ?? 0;
  const productCount = products?.length ?? 0;

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl uppercase tracking-tighter text-on-surface">
          Dashboard
        </h1>
        <p className="font-mono text-sm text-outline uppercase tracking-widest">
          Manage your store
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/orders"
          className="bg-surface-container border border-outline-variant p-6 flex flex-col gap-3 hover:border-secondary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <ShoppingBag className="text-secondary" size={22} />
            <ArrowRight className="text-outline" size={16} />
          </div>
          <span className="font-display text-4xl text-on-surface">
            {orders === undefined ? "—" : totalOrders}
          </span>
          <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
            Orders {pending.length > 0 && <span className="text-secondary">· {pending.length} pending</span>}
          </span>
        </Link>

        <Link
          href="/admin/products"
          className="bg-surface-container border border-outline-variant p-6 flex flex-col gap-3 hover:border-secondary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <Package className="text-secondary" size={22} />
            <ArrowRight className="text-outline" size={16} />
          </div>
          <span className="font-display text-4xl text-on-surface">
            {products === undefined ? "—" : productCount}
          </span>
          <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
            Products
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-xl uppercase tracking-tighter text-on-surface">
          Quick Actions
        </h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/admin/products"
            className="flex justify-between items-center px-4 py-3 border border-outline-variant bg-surface-container hover:border-secondary/50 transition-colors font-mono text-sm uppercase tracking-widest text-on-surface-variant hover:text-secondary"
          >
            Add a new product
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/admin/settings"
            className="flex justify-between items-center px-4 py-3 border border-outline-variant bg-surface-container hover:border-secondary/50 transition-colors font-mono text-sm uppercase tracking-widest text-on-surface-variant hover:text-secondary"
          >
            Site settings
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}