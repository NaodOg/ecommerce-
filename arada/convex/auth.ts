import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const verifyAdminPassword = action({
  args: { password: v.string() },
  handler: async (ctx, args): Promise<boolean> => {
    const override = await ctx.runQuery(api.settings.get, {
      key: "admin_password",
    });
    const expected = override ?? process.env.ADMIN_PASSWORD;
    return expected !== undefined && args.password === expected;
  },
});

export const changeAdminPassword = action({
  args: { current: v.string(), next: v.string() },
  handler: async (ctx, args): Promise<boolean> => {
    if (args.next.length < 4) return false;
    const override = await ctx.runQuery(api.settings.get, {
      key: "admin_password",
    });
    const expected = override ?? process.env.ADMIN_PASSWORD;
    if (args.current !== expected) return false;
    await ctx.runMutation(api.settings.set, {
      key: "admin_password",
      value: args.next,
    });
    return true;
  },
});