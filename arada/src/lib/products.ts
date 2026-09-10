export type Product = {
  slug: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
  description: string;
};

export const allProducts: Product[] = [
  {
    slug: "heavyweight-tee",
    name: "Heavyweight Tee",
    price: "$38",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "tees",
    description: "240gsm heavyweight cotton tee. Boxed drop-shoulder cut with a ribbed collar that holds its shape.",
  },
  {
    slug: "boxy-hoodie",
    name: "Boxy Hoodie",
    price: "$72",
    image: "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
    category: "hoodies",
    description: "Oversized boxy hoodie with a brushed fleece interior. Double-layered hood, steel-tipped drawcords.",
  },
  {
    slug: "workwear-jacket",
    name: "Workwear Jacket",
    price: "$120",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    badge: "NEW",
    category: "outerwear",
    description: "Heavy canvas workwear jacket with utility cargo pockets and bartacked stress points.",
  },
  {
    slug: "cargo-pants",
    name: "Cargo Pants",
    price: "$65",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    category: "pants",
    description: "Ripstop nylon cargo pants with articulated knee darts and a tapered, stacking leg.",
  },
  {
    slug: "denim-jacket",
    name: "Denim Jacket",
    price: "$95",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    badge: "SOLD OUT",
    category: "outerwear",
    description: "12oz selvedge denim trucker jacket. Aged hardware, dropped shoulder for an oversized fit.",
  },
  {
    slug: "graphic-tee",
    name: "Graphic Tee",
    price: "$42",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    category: "tees",
    description: "Chest graphic tee on 220gsm jersey. Screen-printed ARADA mark, pre-shrunk.",
  },
  {
    slug: "crewneck-sweatshirt",
    name: "Crewneck Sweatshirt",
    price: "$58",
    image: "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
    category: "hoodies",
    description: "Heavyweight crewneck with a 3-end cotton fleece body and wide, flat ribbed trims.",
  },
  {
    slug: "relaxed-tee",
    name: "Relaxed Tee",
    price: "$35",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "tees",
    description: "Easy-fitting relaxed tee in soft combed cotton. Cropped sleeve, clean tubular body.",
  },
  {
    slug: "puffer-jacket",
    name: "Puffer Jacket",
    price: "$145",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    badge: "NEW",
    category: "outerwear",
    description: "Oversized puffer with recycled insulation. Rubberized zips and a two-way front closure.",
  },
  {
    slug: "wide-leg-pants",
    name: "Wide Leg Pants",
    price: "$70",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    category: "pants",
    description: "High-rise wide leg pant in twill. Deep pockets and an extended back waist tab.",
  },
  {
    slug: "zip-hoodie",
    name: "Zip Hoodie",
    price: "$78",
    image: "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
    category: "hoodies",
    description: "Full-zip hoodie in heavyweight fleece with a metal zip and side-seam gussets.",
  },
  {
    slug: "essential-tee",
    name: "Essential Tee",
    price: "$32",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    category: "tees",
    description: "The everyday staple. 200gsm compact cotton, tonal chest embroidery, no frills.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}