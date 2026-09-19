"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ShoppingBag, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import {
  sizeOptions,
  defaultQuantities,
  sizeBreakdown,
  totalQuantity,
  type SizeQuantities,
} from "@/lib/quantities";
import type { Product } from "@/lib/products";

export function ProductOrderPanel({
  product,
  soldOut,
}: {
  product: Product;
  soldOut: boolean;
}) {
  const [quantities, setQuantities] = useState<SizeQuantities>(defaultQuantities);
  const [orderOpen, setOrderOpen] = useState(false);
  const createOrder = useMutation(api.orders.createOrder);

  async function placeOrder(customer: { name: string; phone: string }) {
    await createOrder({
      customerName: customer.name,
      customerPhone: customer.phone,
      garmentType: product.category,
      garmentColor: product.slug,
      productImage: product.image,
      quantities,
      designStorageId: null,
      designScale: 35,
      designDropY: 0,
      designRotation: 0,
      wholesale: product.plain ? true : undefined,
    });
  }

  const sizeMax = product.plain ? 50 : 9;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-on-surface-variant uppercase tracking-widest">
            {product.plain ? "SIZES / WHOLESALE" : "SIZES"}
          </span>
          {product.plain && product.bulkPrice && product.bulkMin && (
            <span className="font-mono text-sm text-secondary uppercase tracking-widest">
              No minimums &middot; {formatPrice(product.bulkPrice)}/pc at {product.bulkMin}+
            </span>
          )}
          {sizeOptions.map((s) => (
              <div key={s.id} className="flex items-center justify-between border border-outline-variant">
                <span className="px-4 py-2 font-mono text-sm uppercase tracking-widest text-on-surface-variant">
                  {s.label}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantities((q) => ({ ...q, [s.id]: Math.max(0, q[s.id] - 1) }))}
                    className="px-3 py-2 text-on-surface-variant hover:text-secondary transition-colors font-mono text-lg leading-none"
                    aria-label={`Decrease size ${s.label}`}
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono text-sm text-on-surface">
                    {quantities[s.id]}
                  </span>
                  <button
                    onClick={() => setQuantities((q) => ({ ...q, [s.id]: Math.min(sizeMax, q[s.id] + 1) }))}
                    className="px-3 py-2 text-on-surface-variant hover:text-secondary transition-colors font-mono text-lg leading-none"
                    aria-label={`Increase size ${s.label}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        </div>

        <button
          onClick={() => setOrderOpen(true)}
          disabled={soldOut || totalQuantity(quantities) === 0}
          className="flex items-center justify-center gap-2 bg-primary-container text-white font-display text-base px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={16} />
          {soldOut ? "Sold Out" : product.plain ? `Order Wholesale · ${sizeBreakdown(quantities)}` : `Order · ${sizeBreakdown(quantities)}`}
        </button>
      </div>

      {orderOpen && (
        <CheckoutModal
          productName={product.name}
          price={product.price}
          quantities={quantities}
          onClose={() => setOrderOpen(false)}
          onSubmit={async (customer) => {
            await placeOrder(customer);
            setOrderOpen(false);
            alert("Order placed! Manage it in /admin.");
          }}
        />
      )}
    </>
  );
}

function CheckoutModal({
  onClose,
  onSubmit,
  productName,
  price,
  quantities,
}: {
  onClose: () => void;
  onSubmit: (customer: { name: string; phone: string }) => Promise<void>;
  productName: string;
  price: string;
  quantities: SizeQuantities;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ name, phone });
    } catch (err) {
      alert("Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md bg-surface-container border border-outline-variant p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-tighter text-on-surface">Checkout</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-secondary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between font-mono text-sm text-on-surface-variant uppercase tracking-widest border border-outline-variant px-3 py-2">
          <span className="truncate">
            {productName} &middot; {formatPrice(price)} &middot; {sizeBreakdown(quantities)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "w-full bg-primary-container text-white font-display text-base px-6 py-3 uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed",
              "hover:shadow-[0_0_15px_rgba(0,0,255,0.5)]",
            )}
          >
            {submitting ? "Placing..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}