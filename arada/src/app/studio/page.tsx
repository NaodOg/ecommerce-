"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { GarmentStage, garmentColors } from "@/components/studio/GarmentStage";
import { useState, useRef } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Upload, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sizeOptions,
  defaultQuantities,
  sizeBreakdown,
  totalQuantity,
  type SizeQuantities,
} from "@/lib/quantities";

const colors = Object.values(garmentColors);

export default function StudioPage() {
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]["id"]>("black");
  const [designUrl, setDesignUrl] = useState<string | null>(null);
  const [designName, setDesignName] = useState<string | null>(null);
  const [scale, setScale] = useState(35);
  const [dropY, setDropY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [quantities, setQuantities] = useState<SizeQuantities>(defaultQuantities);
  const [orderOpen, setOrderOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const createOrder = useMutation(api.orders.createOrder);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setDesignUrl(ev.target?.result as string);
      setDesignName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function removeDesign() {
    setDesignUrl(null);
    setDesignName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

async function placeOrder(customer: {
    name: string;
    phone: string;
  }) {
    let designStorageId = null;
    if (designUrl && designName) {
      const uploadUrl = await generateUploadUrl();
      const blob = await (await fetch(designUrl)).blob();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: blob,
      });
      if (!result.ok) throw new Error("Upload failed");
      const { storageId } = await result.json();
      designStorageId = storageId;
    }

    await createOrder({
      customerName: customer.name,
      customerPhone: customer.phone,
      garmentType: "tee",
      garmentColor: selectedColor,
      quantities,
      designStorageId,
      designName: designName ?? undefined,
      designScale: scale,
      designDropY: dropY,
      designRotation: rotation,
    });
  }

  return (
    <>
      <TopAppBar />
      <main className="min-h-screen flex flex-col lg:flex-row bg-background">
        {/* Stage */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <GarmentStage
            color={selectedColor}
            designUrl={designUrl}
            scale={scale}
            dropY={dropY}
            rotation={rotation}
            className="max-w-xl"
          />
        </div>

        {/* Control panel */}
        <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-outline-variant p-6 flex flex-col gap-6">
          <div>
            <h1 className="font-display text-2xl text-on-surface uppercase tracking-tighter">
              Make it glow.
            </h1>
            <p className="font-mono text-xs text-outline uppercase tracking-widest">
              ARADA STUDIO &middot; DESIGN IT LIVE
            </p>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">COLOR</span>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  title={c.label}
                  className={cn(
                    "w-9 h-9 rounded-full focus:outline-none transition-all",
                    selectedColor === c.id
                      ? "ring-2 ring-secondary-container ring-offset-2 ring-offset-background"
                      : "hover:scale-110"
                  )}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
          </div>

          {/* Art upload */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">YOUR ART</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleFileUpload}
            />
            {designUrl ? (
              <div className="relative w-full border border-secondary/40 rounded-xl overflow-hidden bg-surface-dim/50">
                <img src={designUrl} alt="Uploaded design" className="w-full h-28 object-contain p-2" />
                <div className="flex items-center justify-between px-3 py-2 border-t border-outline-variant">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase truncate">
                    {designName}
                  </span>
                  <button onClick={removeDesign} className="text-error hover:text-error/80 transition-colors shrink-0">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 border-2 border-dashed border-secondary/40 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-secondary/5 hover:border-secondary transition-all cursor-pointer bg-surface-dim/50"
              >
                <Upload className="text-secondary" size={22} />
                <span className="font-display text-base text-on-surface">Drop your art</span>
                <span className="font-mono text-[10px] text-outline uppercase tracking-widest">PNG / JPG</span>
              </button>
            )}
          </div>

          {/* Transform controls */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">POSITION</span>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">WIDTH {scale}%</span>
              <input
                type="range"
                min={10}
                max={80}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="accent-secondary-container"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">VERTICAL {dropY}px</span>
              <input
                type="range"
                min={-120}
                max={120}
                value={dropY}
                onChange={(e) => setDropY(Number(e.target.value))}
                className="accent-secondary-container"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-outline uppercase tracking-widest">ROTATION {rotation}°</span>
              <input
                type="range"
                min={-45}
                max={45}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="accent-secondary-container"
              />
            </label>
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">SIZES</span>
            <div className="flex flex-col gap-2">
              {sizeOptions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between border border-outline-variant"
                >
                  <span className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                    {s.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setQuantities((q) => ({ ...q, [s.id]: Math.max(0, q[s.id] - 1) }))
                      }
                      className="px-3 py-2 text-on-surface-variant hover:text-secondary transition-colors font-mono text-lg leading-none"
                      aria-label={`Decrease size ${s.label}`}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono text-sm text-on-surface">
                      {quantities[s.id]}
                    </span>
                    <button
                      onClick={() =>
                        setQuantities((q) => ({ ...q, [s.id]: Math.min(9, q[s.id] + 1) }))
                      }
                      className="px-3 py-2 text-on-surface-variant hover:text-secondary transition-colors font-mono text-lg leading-none"
                      aria-label={`Increase size ${s.label}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setOrderOpen(true)}
            disabled={!designUrl || totalQuantity(quantities) === 0}
            className="mt-auto flex items-center justify-center gap-2 bg-primary-container text-white font-display text-sm px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={16} />
            Place Order &middot; {sizeBreakdown(quantities)}
          </button>
        </div>
      </main>

      {orderOpen && (
        <CheckoutModal
          quantities={quantities}
          colorLabel={garmentColors[selectedColor].label}
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
  quantities,
  colorLabel,
}: {
  onClose: () => void;
  onSubmit: (customer: {
    name: string;
    phone: string;
  }) => Promise<void>;
  quantities: SizeQuantities;
  colorLabel: string;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md bg-surface-container border border-outline-variant p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-tighter text-on-surface">
            Checkout
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-secondary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant uppercase tracking-widest border border-outline-variant px-3 py-2">
          <span>{colorLabel} TEE &middot; {sizeBreakdown(quantities)}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary"
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-container text-white font-display text-sm px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Placing..." : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
