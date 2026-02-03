import { internal } from "../_generated/api";
import { migrations } from "../migrations";

/**
 * Backfill flag to true for items named "priority".
 */
export const backfillFlag = migrations.define({
  table: "items",
  batchSize: 10,
  migrateOne: (_ctx, doc) => {
    if (doc.name !== "priority" || doc.flag === true) return;
    return { flag: true };
  },
});

export const run = migrations.runner([
  // TS2589 error occurs here as well
  internal.migrations["20250102_backfill_flag"].backfillFlag,
]);
