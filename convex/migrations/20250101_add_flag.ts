import { internal } from "../_generated/api";
import { migrations } from "../migrations";

/**
 * Add optional flag field to all items.
 * Default to false for existing items without a flag.
 */
export const addFlag = migrations.define({
  table: "items",
  migrateOne: (_ctx, doc) => {
    if (doc.flag !== undefined) return;
    return { flag: false };
  },
});

export const run = migrations.runner([
  // TS2589 error occurs here when TypeScript tries to resolve the type
  internal.migrations["20250101_add_flag"].addFlag,
]);
