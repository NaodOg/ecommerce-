import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const orderStatus = {
  pending: "pending",
  inProgress: "in-progress",
  shipped: "shipped",
  cancelled: "cancelled",
} as const;

export const orderStatuses: (typeof orderStatus)[keyof typeof orderStatus][] = [
  orderStatus.pending,
  orderStatus.inProgress,
  orderStatus.shipped,
  orderStatus.cancelled,
];

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    price: v.string(),
    category: v.string(),
    description: v.string(),
    badge: v.optional(v.string()),
    imageStorageId: v.union(v.id("_storage"), v.null()),
    imageUrl: v.optional(v.string()),
    plain: v.optional(v.boolean()),
    bulkPrice: v.optional(v.string()),
    bulkMin: v.optional(v.number()),
    sortOrder: v.number(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
  orders: defineTable({
    customerName: v.string(),
    customerPhone: v.string(),
    garmentType: v.string(),
    garmentColor: v.string(),
    productImage: v.optional(v.string()),
    quantities: v.object({
      S: v.number(),
      M: v.number(),
      L: v.number(),
      XL: v.number(),
      XXL: v.number(),
    }),
    designStorageId: v.union(v.id("_storage"), v.null()),
    designName: v.optional(v.string()),
    designScale: v.number(),
    designDropY: v.number(),
    designRotation: v.number(),
    wholesale: v.optional(v.boolean()),
    status: v.union(
      v.literal(orderStatus.pending),
      v.literal(orderStatus.inProgress),
      v.literal(orderStatus.shipped),
      v.literal(orderStatus.cancelled),
    ),
    createdAt: v.number(),
  }),
});