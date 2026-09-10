import { cn } from "@/lib/utils";

export const garmentColors = {
  black: { id: "black", label: "Black", swatch: "#0a0a0a" },
  white: { id: "white", label: "White", swatch: "#ece9e2" },
  beige: { id: "beige", label: "Beige", swatch: "#d3b98d" },
  blue: { id: "blue", label: "Blue", swatch: "#4874c4" },
} as const;

export function GarmentStage({
  color,
  designUrl,
  scale = 35,
  dropY = 0,
  rotation = 0,
  className,
}: {
  color: keyof typeof garmentColors;
  designUrl?: string | null;
  scale?: number;
  dropY?: number;
  rotation?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: "4000 / 3400", backgroundColor: "#e8c6a0" }}
    >
      <div className="absolute inset-[7%]">
        <img
          src={`/garments/tee-${color}.png`}
          alt="Garment"
          draggable={false}
          className="absolute inset-0 w-full h-full select-none"
          style={{ pointerEvents: "none" }}
        />
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
  );
}