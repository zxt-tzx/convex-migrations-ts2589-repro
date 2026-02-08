import { Triggers } from "convex-helpers/server/triggers";
import { internal } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { itemsByFlag } from "./aggregates";

/**
 * Triggers using convex-helpers + internal mutation + scheduler pattern.
 * The combination of Triggers context + internal.* access + scheduler
 * causes TS2589 when there are many modules.
 */
export function registerTriggers(triggers: Triggers<DataModel>) {
  // Register aggregate trigger
  triggers.register("items", itemsByFlag.trigger());

  // Register trigger with scheduler pattern (causes TS2589)
  triggers.register("items", async (ctx, change) => {
    if (change.operation === "insert") {
      // This pattern causes TS2589:
      // - Triggers context
      // - ctx.runMutation with internal.* path
      // - Nested submodule access
      await ctx.runMutation(
        internal.usage.mutations.insertUsageEventWithJitter,
        {
          companyId: change.id as any, // Will need proper companyId
          eventType: "item_created",
          amount: 1,
          resourceId: change.id,
        },
      );

      // Nested submodule pattern
      await ctx.runMutation(
        internal.docgens.mutations.markAsProcessing,
        { id: change.id },
      );

      // PDF cleanup pattern
      void ctx.scheduler.runAfter(1000, internal.pdf.actions.cleanupStorageIds, {
        ids: ["test"],
      });
    }
  });
}
