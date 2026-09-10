export const sizeOptions: { id: SizeId; label: string }[] = [
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
  { id: "XXL", label: "2XL" },
];

export type SizeId = "S" | "M" | "L" | "XL" | "XXL";

export const sizeIds: SizeId[] = sizeOptions.map((o) => o.id);

export type SizeQuantities = Record<SizeId, number>;

export const defaultQuantities: SizeQuantities = { S: 1, M: 0, L: 0, XL: 0, XXL: 0 };

export function totalQuantity(q: SizeQuantities): number {
  return sizeIds.reduce((sum, s) => sum + q[s], 0);
}

export function sizeBreakdown(q: SizeQuantities): string {
  const parts = sizeOptions
    .filter((o) => q[o.id] > 0)
    .map((o) => `${o.label} ×${q[o.id]}`);
  return parts.length ? parts.join(", ") : "—";
}