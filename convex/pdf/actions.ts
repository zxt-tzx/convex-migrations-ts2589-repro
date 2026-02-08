import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

/**
 * Nested mutation in pdf submodule.
 */
export const cleanupStorageIds = internalMutation({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    // Cleanup logic would go here
  },
});
