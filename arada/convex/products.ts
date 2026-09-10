import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("asc").collect();
    return Promise.all(
      products.map(async (p) => ({
        ...p,
        image: p.imageStorageId && p.imageUrl
          ? p.imageUrl
          : p.imageStorageId
            ? (await ctx.storage.getUrl(p.imageStorageId)) ?? p.imageUrl ?? null
            : p.imageUrl ?? null,
      })),
    );
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!product) return null;
    return {
      ...product,
      image:
        product.imageStorageId && product.imageUrl
          ? product.imageUrl
          : product.imageStorageId
            ? (await ctx.storage.getUrl(product.imageStorageId)) ?? product.imageUrl ?? null
            : product.imageUrl ?? null,
    };
  },
});

export const createProduct = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    price: v.string(),
    category: v.string(),
    description: v.string(),
    badge: v.optional(v.string()),
    imageStorageId: v.union(v.id("_storage"), v.null()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) throw new Error("A product with that slug already exists.");
    return await ctx.db.insert("products", {
      ...args,
      sortOrder: Date.now(),
      createdAt: Date.now(),
    });
  },
});

export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    name: v.string(),
    slug: v.string(),
    price: v.string(),
    category: v.string(),
    description: v.string(),
    badge: v.optional(v.string()),
    imageStorageId: v.union(v.id("_storage"), v.null()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { productId, ...fields } = args;
    const existing = await ctx.db.get(productId);
    const conflict = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", fields.slug))
      .first();
    if (conflict && conflict._id !== productId) {
      throw new Error("A product with that slug already exists.");
    }
    if (
      existing?.imageStorageId && existing.imageStorageId !== fields.imageStorageId
    ) {
      await ctx.storage.delete(existing.imageStorageId);
    }
    await ctx.db.patch(productId, fields);
  },
});

export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (product?.imageStorageId) {
      await ctx.storage.delete(product.imageStorageId);
    }
    await ctx.db.delete(args.productId);
  },
});

const seedProducts = [
  { name: "Heavyweight Tee", slug: "heavyweight-tee", price: "$38", category: "tees", description: "240gsm heavyweight cotton tee. Boxed drop-shoulder cut with a ribbed collar that holds its shape.", badge: "NEW" },
  { name: "Boxy Hoodie", slug: "boxy-hoodie", price: "$72", category: "hoodies", description: "Oversized boxy hoodie with a brushed fleece interior. Double-layered hood, steel-tipped drawcords." },
  { name: "Workwear Jacket", slug: "workwear-jacket", price: "$120", category: "outerwear", description: "Heavy canvas workwear jacket with utility cargo pockets and bartacked stress points." },
  { name: "Cargo Pants", slug: "cargo-pants", price: "$65", category: "pants", description: "Ripstop nylon cargo pants with articulated knee darts and a tapered, stacking leg." },
  { name: "Denim Jacket", slug: "denim-jacket", price: "$95", category: "outerwear", description: "12oz selvedge denim trucker jacket. Aged hardware, dropped shoulder for an oversized fit.", badge: "SOLD OUT" },
  { name: "Graphic Tee", slug: "graphic-tee", price: "$42", category: "tees", description: "Chest graphic tee on 220gsm jersey. Screen-printed ARADA mark, pre-shrunk." },
  { name: "Crewneck Sweatshirt", slug: "crewneck-sweatshirt", price: "$58", category: "hoodies", description: "Heavyweight crewneck with a 3-end cotton fleece body and wide, flat ribbed trims." },
  { name: "Relaxed Tee", slug: "relaxed-tee", price: "$35", category: "tees", description: "Easy-fitting relaxed tee in soft combed cotton. Cropped sleeve, clean tubular body." },
  { name: "Puffer Jacket", slug: "puffer-jacket", price: "$145", category: "outerwear", description: "Oversized puffer with recycled insulation. Rubberized zips and a two-way front closure.", badge: "NEW" },
  { name: "Wide Leg Pants", slug: "wide-leg-pants", price: "$70", category: "pants", description: "High-rise wide leg pant in twill. Deep pockets and an extended back waist tab." },
  { name: "Zip Hoodie", slug: "zip-hoodie", price: "$78", category: "hoodies", description: "Full-zip hoodie in heavyweight fleece with a metal zip and side-seam gussets." },
  { name: "Essential Tee", slug: "essential-tee", price: "$32", category: "tees", description: "The everyday staple. 200gsm compact cotton, tonal chest embroidery, no frills." },
];

const seedImages: Record<string, string> = {
  "heavyweight-tee": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  "boxy-hoodie": "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
  "workwear-jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  "cargo-pants": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  "denim-jacket": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
  "graphic-tee": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
  "crewneck-sweatshirt": "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
  "relaxed-tee": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  "puffer-jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  "wide-leg-pants": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  "zip-hoodie": "https://images.unsplash.com/photo-1556821840-3a63f7560068?w=600&q=80",
  "essential-tee": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
};

export const seed = mutation({
  args: { run: v.optional(v.boolean()) },
  handler: async (ctx) => {
    const count = (await ctx.db.query("products").collect()).length;
    if (count > 0) return { seeded: false, count };
    for (const p of seedProducts) {
      await ctx.db.insert("products", {
        ...p,
        imageStorageId: null,
        imageUrl: seedImages[p.slug] ?? null,
        sortOrder: 0,
        createdAt: Date.now(),
      });
    }
    const after = (await ctx.db.query("products").collect()).length;
    return { seeded: true, count: after };
  },
});

export type ProductWithImage = {
  _id: Id<"products">;
  _creationTime: number;
  name: string;
  slug: string;
  price: string;
  category: string;
  description: string;
  badge?: string;
  imageStorageId: Id<"_storage"> | null;
  imageUrl?: string;
  sortOrder: number;
  createdAt: number;
  image: string | null;
};
