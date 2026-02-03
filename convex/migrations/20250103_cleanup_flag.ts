import { internal } from "../_generated/api";
import { migrations } from "../migrations";

/**
 * Set flag to false for legacy items.
 */
export const cleanupFlag = migrations.define({
  table: "items",
  batchSize: 10,
  migrateOne: (_ctx, doc) => {
    if (doc.name !== "legacy" || doc.flag === false) return;
    return { flag: false };
  },
});

export const run = migrations.runner([
  // TS2589 error occurs here too
  internal.migrations["20250103_cleanup_flag"].cleanupFlag,
]);
