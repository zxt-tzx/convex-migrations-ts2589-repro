import { WorkflowManager } from "@convex-dev/workflow";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";

/**
 * Workflow using @convex-dev/workflow component.
 * Workflows add significant type complexity to the generated API.
 */
const workflow = new WorkflowManager(components.workflow, {
  workpoolOptions: {},
});

export const processItemWorkflow = workflow.define({
  args: { itemId: v.id("items") },
  handler: async (step, { itemId }) => {
    // Get item using internal query
    const item = await step.runQuery(
      internal.queries.getInternal,
      { id: itemId },
    );

    if (!item) throw new Error("Item not found");

    // Process in steps using internal mutation
    await step.runMutation(
      internal.mutations.updateFlagInternal,
      { id: itemId, flag: !item.flag },
    );
  },
});
