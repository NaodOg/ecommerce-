import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string): string {
  const cleaned = price.replace(/[^0-9.,]/g, "").trim();
  return cleaned ? `${cleaned} ETB` : price;
}
