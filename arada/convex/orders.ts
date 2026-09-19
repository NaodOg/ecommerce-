import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { orderStatus, orderStatuses } from "./schema";

export const listOrders = query({
  args: {},
  handler: async (ctx): Promise<OrderWithUrl[]> => {
    const orders = await ctx.db.query("orders").order("desc").collect();
    return Promise.all(
      orders.map(
        async (order): Promise<OrderWithUrl> => ({
          ...order,
          designUrl: order.designStorageId
            ? await ctx.storage.getUrl(order.designStorageId)
            : null,
        }),
      ),
    );
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;
    return {
      ...order,
      designUrl: order.designStorageId
        ? await ctx.storage.getUrl(order.designStorageId)
        : null,
    };
  },
});

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: orderStatus.pending,
      createdAt: Date.now(),
    });
    return orderId;
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal(orderStatus.pending),
      v.literal(orderStatus.inProgress),
      v.literal(orderStatus.shipped),
      v.literal(orderStatus.cancelled),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, { status: args.status });
  },
});

export const deleteOrder = mutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (order?.designStorageId) {
      await ctx.storage.delete(order.designStorageId);
    }
    await ctx.db.delete(args.orderId);
  },
});

export type OrderWithUrl = {
  _id: Id<"orders">;
  _creationTime: number;
  customerName: string;
  customerPhone: string;
  garmentType: string;
  garmentColor: string;
  productImage?: string;
  quantities: { S: number; M: number; L: number; XL: number; XXL: number };
  designStorageId: Id<"_storage"> | null;
  designName?: string;
  designScale: number;
  designDropY: number;
  designRotation: number;
  wholesale?: boolean;
  status: Doc<"orders">["status"];
  createdAt: number;
  designUrl: string | null;
};