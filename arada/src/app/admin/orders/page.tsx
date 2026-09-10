"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GarmentStage, garmentColors } from "@/components/studio/GarmentStage";
import { Trash2, PackageOpen, Maximize2, X, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { sizeBreakdown } from "@/lib/quantities";
import type { OrderWithUrl } from "@/convex/orders";

const orderStatuses = ["pending", "in-progress", "shipped", "cancelled"] as const;
type OrderStatus = (typeof orderStatuses)[number];

const statusStyle: Record<OrderStatus, string> = {
  pending: "text-secondary-container border-secondary-container",
  "in-progress": "text-tertiary border-tertiary",
  shipped: "text-secondary border-secondary",
  cancelled: "text-error border-error",
};

async function downloadDesign(url: string, name: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = name || "arada-design";
  a.click();
  URL.revokeObjectURL(objectUrl);
}

export default function AdminOrdersPage() {
  const orders = useQuery(api.orders.listOrders);
  const updateStatus = useMutation(api.orders.updateStatus);
  const deleteOrder = useMutation(api.orders.deleteOrder);
  const [preview, setPreview] = useState<OrderWithUrl | null>(null);

  if (orders === undefined) {
    return (
      <div className="p-8 font-mono text-sm text-outline uppercase tracking-widest">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 px-4">
        <PackageOpen className="text-outline" size={40} />
        <p className="font-display text-xl text-on-surface-variant uppercase tracking-tighter">
          No orders yet
        </p>
        <p className="font-mono text-sm text-outline uppercase tracking-widest">
          Orders from the studio will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-2xl uppercase tracking-tighter text-on-surface">
          Orders
        </h1>
        <span className="font-mono text-sm text-outline uppercase tracking-widest">
          {orders.length} total
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex border border-outline-variant bg-surface-container overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setPreview(order)}
              className="relative w-32 shrink-0 bg-surface-dim p-2 group"
              aria-label="Zoom in on design"
            >
              {order.productImage ? (
                <img
                  src={order.productImage}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              ) : (
                <GarmentStage
                  color={order.garmentColor as keyof typeof garmentColors}
                  designUrl={order.designUrl}
                  scale={order.designScale}
                  dropY={order.designDropY}
                  rotation={order.designRotation}
                />
              )}
              <span className="absolute top-1 right-1 p-1 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={12} />
              </span>
            </button>

            <div className="flex-1 min-w-0 p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-base text-on-surface uppercase tracking-tighter truncate">
                    {order.customerName}
                  </span>
                  <span className="font-mono text-sm text-outline uppercase tracking-widest truncate">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest border px-2 py-0.5 shrink-0",
                    statusStyle[order.status],
                  )}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-0.5 font-mono text-sm text-on-surface-variant min-w-0">
                <span className="truncate">{order.customerPhone}</span>
              </div>

              <span className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 bg-surface-variant text-on-surface-variant shrink-0">
                {sizeBreakdown(order.quantities)}
              </span>
              {order.designName && (
                <span className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 bg-surface-variant text-on-surface-variant truncate max-w-[200px] self-start">
                  {order.designName}
                </span>
              )}

              <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus({
                      orderId: order._id,
                      status: e.target.value as OrderStatus,
                    })
                  }
                  className="bg-surface-dim border border-outline-variant text-on-surface font-mono text-sm uppercase tracking-widest px-2 py-1.5 focus:outline-none focus:border-secondary"
                >
                  {orderStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteOrder({ orderId: order._id })}
                  className="flex items-center gap-1 text-error hover:text-error/80 transition-colors font-mono text-sm uppercase tracking-widest"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="w-full max-w-2xl bg-surface-container border border-outline-variant flex flex-col max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-4 border-b border-outline-variant">
              <div className="flex flex-col min-w-0">
                <span className="font-display text-lg text-on-surface uppercase tracking-tighter truncate">
                  {preview.customerName}
                </span>
<span className="font-mono text-sm text-outline uppercase tracking-widest truncate">
                    {preview.designName ?? "No design attached"}
                  </span>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="text-on-surface-variant hover:text-secondary transition-colors shrink-0"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-surface-dim">
              {preview.productImage ? (
                <img
                  src={preview.productImage.replace("w=600", "w=1400")}
                  alt="Product"
                  className="mx-auto max-w-xl w-full aspect-[3/4] object-cover"
                />
              ) : (
                <GarmentStage
                  color={preview.garmentColor as keyof typeof garmentColors}
                  designUrl={preview.designUrl}
                  scale={preview.designScale}
                  dropY={preview.designDropY}
                  rotation={preview.designRotation}
                  className="mx-auto max-w-xl"
                />
              )}
            </div>

            <div className="p-4 flex flex-col gap-3 border-t border-outline-variant">
              {preview.designUrl ? (
                <>
                  <a
                    href={preview.designUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-surface-variant text-on-surface font-display text-sm px-4 py-3 uppercase tracking-wider hover:bg-surface-variant/70 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open design file
                  </a>
                  <button
                    onClick={() =>
                      downloadDesign(preview.designUrl!, preview.designName ?? "arada-design")
                    }
                    className="flex items-center justify-center gap-2 bg-primary-container text-white font-display text-sm px-4 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all"
                  >
                    <Download size={14} />
                    Download for print
                  </button>
                </>
              ) : (
                <p className="font-mono text-sm text-outline uppercase tracking-widest">
                  {preview.productImage
                    ? "Standard product order — no custom design."
                    : "This order has no artwork."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}