/**
 * Frontend code demonstrating TS2589 errors that persist even after
 * removing `const run = migrations.runner()` from migrations.ts.
 *
 * These patterns are standard Convex frontend usage but hit TS2589
 * when the migrations component is installed.
 */
import type { FunctionReturnType } from "convex/server";
import { api } from "../convex/_generated/api";

// Pattern 1: FunctionReturnType utility type
// Used to extract return types for component props
// TS2589 occurs here
type ItemList = FunctionReturnType<typeof api.queries.list>;
type SingleItem = FunctionReturnType<typeof api.queries.get>;

// Pattern 2: Direct api reference (for useQuery, useMutation, etc.)
// In a real app these would be passed to hooks:
//   const items = useQuery(api.queries.list);
//   const item = useQuery(api.queries.get, { id });
//   const update = useMutation(api.mutations.updateFlag);
// TS2589 occurs on the api.* references
export const listRef = api.queries.list;
export const getRef = api.queries.get;
export const updateFlagRef = api.mutations.updateFlag;

// Use the types to prove they're needed (avoid unused type errors)
export type { ItemList, SingleItem };
