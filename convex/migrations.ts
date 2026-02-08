import { Migrations } from "@convex-dev/migrations";

import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { internalMutation } from "./_generated/server";

/**
 * Shared migrations instance used across all migration files.
 *
 * IMPORTANT: Only export the migrations instance from this file, not any
 * Convex functions (runners, mutations, etc). Exporting functions here causes
 * TS2589 across the codebase because _generated/api.d.ts includes
 * `typeof migrations` (this module) and runner return types create excessive
 * type depth in the generated `internal` type.
 *
 * See: https://github.com/get-convex/migrations/issues/28
 */
export const migrations = new Migrations<DataModel>(components.migrations, {
  internalMutation,
});
