"use client";

import { TopAppBar } from "@/components/layout/TopAppBar";
import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const colorPresets = [
  { id: "black", label: "Black", swatch: "#0a0a0a" },
  { id: "white", label: "White", swatch: "#ece9e2" },
  { id: "beige", label: "Beige", swatch: "#d3b98d" },
  { id: "blue", label: "Blue", swatch: "#2050ce" },
];

export default function MockupTestPage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [designUrl, setDesignUrl] = useState<string | null>(null);
  const [designName, setDesignName] = useState<string | null>(null);
  const [scale, setScale] = useState(35);
  const [dropY, setDropY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <TopAppBar />
      <main className="flex-1 relative min-h-screen flex flex-col lg:flex-row bg-background">
        {/* Stage */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div
            className="relative w-full max-w-xl overflow-hidden"
            style={{ aspectRatio: "4000 / 3400", backgroundColor: "#e8c6a0" }}
          >
            {/* Garment (inset so a grey matte surrounds the shirt) */}
            <div className="absolute inset-[7%]">
              {/* 1. Garment — color baked in */}
              <img
                src={`/garments/tee-${selectedColor}.png`}
                alt="Garment"
                draggable={false}
                className="absolute inset-0 w-full h-full select-none"
                style={{ pointerEvents: "none" }}
              />
              {/* 2. Design overlay */}
              {designUrl && (
                <img
                  src={designUrl}
                  alt="Design"
                  draggable={false}
                  className="absolute left-1/2 select-none"
                  style={{
                    width: `${scale}%`,
                    top: `32%`,
                    transform: `translate(-50%, ${dropY}px) rotate(${rotation}deg)`,
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Control panel */}
        <div className="lg:w-[400px] border-t lg:border-t-0 lg:border-l border-outline-variant p-6 flex flex-col gap-6">
          <div>
            <h1 className="font-display text-2xl text-on-surface uppercase tracking-tighter">
              Mockup Preview
            </h1>
            <p className="font-mono text-xs text-outline uppercase tracking-widest">
              2D layered render &middot; test
            </p>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">COLOR</span>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((c) => (
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
        </div>
      </main>
    </>
  );
}