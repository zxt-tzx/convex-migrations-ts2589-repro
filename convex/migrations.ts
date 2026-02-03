import { Migrations } from "@convex-dev/migrations";

import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { internalMutation } from "./_generated/server";

/**
 * Shared migrations instance used across all migration files.
 *
 * This pattern is recommended in the migrations docs but causes TS2589
 * when you have multiple migration files that reference internal.migrations[...].
 */
export const migrations = new Migrations<DataModel>(components.migrations, {
  internalMutation,
});

// General runner for running all migrations via CLI
export const run = migrations.runner();
