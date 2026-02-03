import { api } from "../convex/_generated/api";

// TS2589 errors also occur when using the api object here
export const migrationRunner = api.migrations.run;
export const addFlagMigration = api.migrations["20250101_add_flag"].addFlag;
