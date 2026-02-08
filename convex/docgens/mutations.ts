import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

/**
 * Nested mutation in docgens submodule.
 */
export const markAsProcessing = internalMutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { flag: true });
  },
});
