import { v } from "convex/values";
import { query, internalQuery } from "./_generated/server";

/**
 * Public query - used via `api.queries.list` from frontend
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("items").collect();
  },
});

/**
 * Public query - used via `api.queries.get` from frontend
 */
export const get = query({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Internal query - used via `internal.queries.getInternal` from backend
 */
export const getInternal = internalQuery({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
