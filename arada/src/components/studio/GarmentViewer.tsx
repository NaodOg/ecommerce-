"use client";

import { useCallback, useRef, useState } from "react";

export interface GarmentConfig {
  /** asset id, maps to /garments/<type>-<color>.png */
  color: "black" | "white" | "beige" | "blue";
  type?: "tee";
}

interface GarmentViewerProps extends GarmentConfig {
  designTexture: string | null;
}

/** Background staged behind the garment (soft orange). Exported for reuse. */
export const STAGE_BG = "#e8c6a0";

const GARMENT_ASPECT = 4000 / 3400;

export function GarmentViewer({
  color,
  designTexture,
}: GarmentViewerProps) {
  const [scale, setScale] = useState(35);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!designTexture) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offsetX, oy: offsetY };
  }, [designTexture, offsetX, offsetY]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    setOffsetX(d.ox + dx);
    setOffsetY(d.oy + dy);
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      style={{ backgroundColor: STAGE_BG, aspectRatio: `${GARMENT_ASPECT}` }}
    >
      {/* Garment — color baked in */}
      <img
        src={`/garments/tee-${color}.png`}
        alt="Garment"
        draggable={false}
        className="absolute w-full h-full object-contain select-none"
        style={{ pointerEvents: "none" }}
      />

      {/* Design overlay — draggable */}
      {designTexture && (
        <img
          src={designTexture}
          alt="Design"
          draggable={false}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="absolute left-1/2 top-[32%] select-none touch-none"
          style={{
            width: `${scale}%`,
            transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
          }}
        />
      )}

      {/* Transform controls */}
      {designTexture && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-5 px-5 py-3 glass-panel border border-outline-variant rounded-xl">
          <label className="flex items-center gap-2 text-on-surface-variant">
            <span className="font-mono text-[10px] uppercase tracking-widest">Size</span>
            <input
              type="range"
              min={10}
              max={80}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="accent-secondary-container w-24"
            />
          </label>
          <label className="flex items-center gap-2 text-on-surface-variant">
            <span className="font-mono text-[10px] uppercase tracking-widest">Rot</span>
            <input
              type="range"
              min={-45}
              max={45}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="accent-secondary-container w-24"
            />
          </label>
        </div>
      )}
    </div>
  );
}
