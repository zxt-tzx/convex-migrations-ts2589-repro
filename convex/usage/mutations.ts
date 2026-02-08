import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalMutation } from "../_generated/server";

/**
 * Args for usage event insertion.
 */
const usageEventBaseArgs = {
  companyId: v.id("companies"),
  eventType: v.string(),
  amount: v.number(),
  resourceId: v.optional(v.id("items")),
};

/**
 * Insert a usage event directly (internal, scheduled by insertUsageEventWithJitter).
 */
export const insertUsageEventDirect = internalMutation({
  args: {
    ...usageEventBaseArgs,
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("usageEvents", {
      companyId: args.companyId,
      eventType: args.eventType,
      amount: args.amount,
      resourceId: args.resourceId,
    });
  },
});

/**
 * Insert a usage event with automatic jitter to avoid OCC conflicts.
 * Uses ctx.scheduler.runAfter() which adds type complexity.
 */
export const insertUsageEventWithJitter = internalMutation({
  args: usageEventBaseArgs,
  handler: async (ctx, args) => {
    const jitter = Math.random() * 2000;
    await ctx.scheduler.runAfter(
      jitter,
      internal.usage.mutations.insertUsageEventDirect,
      {
        ...args,
        createdAt: Date.now(),
      },
    );
  },
});
