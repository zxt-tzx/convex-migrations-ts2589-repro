import { v } from "convex/values";
import { internalQuery } from "../_generated/server";

/**
 * Nested query in docgens submodule.
 */
export const getDocGen = internalQuery({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
