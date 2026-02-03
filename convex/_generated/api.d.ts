/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as migrations from "../migrations.js";
import type * as migrations_20250101_add_flag from "../migrations/20250101_add_flag.js";
import type * as migrations_20250102_backfill_flag from "../migrations/20250102_backfill_flag.js";
import type * as migrations_20250103_cleanup_flag from "../migrations/20250103_cleanup_flag.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  ApiFromModules<{
    migrations: typeof migrations;
    "migrations/20250101_add_flag": typeof migrations_20250101_add_flag;
    "migrations/20250102_backfill_flag": typeof migrations_20250102_backfill_flag;
    "migrations/20250103_cleanup_flag": typeof migrations_20250103_cleanup_flag;
  }>,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  ApiFromModules<{
    migrations: typeof migrations;
    "migrations/20250101_add_flag": typeof migrations_20250101_add_flag;
    "migrations/20250102_backfill_flag": typeof migrations_20250102_backfill_flag;
    "migrations/20250103_cleanup_flag": typeof migrations_20250103_cleanup_flag;
  }>,
  FunctionReference<any, "internal">
>;

export declare const components: {
  migrations: import("@convex-dev/migrations/_generated/component.js").ComponentApi<"migrations">;
};
