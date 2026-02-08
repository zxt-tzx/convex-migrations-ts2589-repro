import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";

/**
 * Public mutation - used via `api.mutations.updateFlag` from frontend
 */
export const updateFlag = mutation({
  args: { id: v.id("items"), flag: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { flag: args.flag });
  },
});

/**
 * Internal mutation - used via `internal.mutations.updateFlagInternal` from backend
 */
export const updateFlagInternal = internalMutation({
  args: { id: v.id("items"), flag: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { flag: args.flag });
  },
});
