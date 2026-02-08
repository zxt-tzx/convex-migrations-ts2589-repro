# Convex Migrations TS2589 Reproduction

This repo demonstrates the TS2589 "Type instantiation is excessively deep" issue with `@convex-dev/migrations` and the fix.

## The Fix

The issue was that `convex/migrations.ts` exported a Convex function (`const run = migrations.runner()`), which caused excessive type depth in the generated `_generated/api.d.ts`.

**Correct structure** - only export the migrations instance:
```typescript
// convex/migrations.ts
import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { internalMutation } from "./_generated/server";

export const migrations = new Migrations<DataModel>(components.migrations, {
  internalMutation,
});
```

**Incorrect structure** - exporting Convex functions causes TS2589:
```typescript
// WRONG - causes TS2589
export const run = migrations.runner();  // DON'T do this!
export const migrations = new Migrations<DataModel>(...);
```

## Structure

- `convex/migrations.ts` - Only exports the migrations instance (correct fix)
- `convex/migrations/*.ts` - Migration files using the migrations instance
- `convex/workflows.ts` - Workflow using @convex-dev/workflow component
- `convex/aggregates.ts` - TableAggregate using @convex-dev/aggregate component
- `convex/queries.ts`, `mutations.ts`, `actions.ts` - Regular Convex functions
- `convex/triggers.ts` - Triggers using convex-helpers
- `convex/modules/*.ts` - 50 filler modules to test type complexity
- `src/*.ts` - Frontend code showing API usage patterns
- `_generated/api.d.ts` - Generated API with 3 Convex components

## Running

```bash
npm install
npx convex dev  # Generate _generated files
npm run typecheck  # Should pass with no TS2589
```

## What Was Fixed

- Multiple Convex components: migrations, workflow, aggregate
- 50+ modules in the codebase
- Frontend patterns: `FunctionReturnType<typeof api.*>`, `api.*` references
- Backend patterns: `ctx.runQuery(internal.queries.*)`, triggers

The key insight is that exporting Convex functions (like `runner()`) from a module that appears in `ApiFromModules` creates excessive type depth. Only export the component instance, not any Convex functions.
