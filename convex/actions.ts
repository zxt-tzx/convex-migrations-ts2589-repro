import { WorkflowManager } from "@convex-dev/workflow";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const workflow = new WorkflowManager(components.workflow, {
  workpoolOptions: {},
});

/**
 * Internal action that uses workflows and calls internal queries/mutations.
 *
 * This pattern (accessing deep `internal.*` paths + workflow component)
 * causes TS2589 even after the migrations.runner() fix.
 */
export const processItem = internalAction({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    // TS2589 occurs here - accessing internal.queries.getInternal
    const item = await ctx.runQuery(
      internal.queries.getInternal,
      { id: args.id },
    );

    if (!item) throw new Error("Item not found");

    // Start a workflow - this adds more type complexity
    await workflow.start(
      ctx,
      internal.workflows.processItemWorkflow,
      { itemId: args.id },
    );

    console.log("Processing item:", item.name);
  },
});
