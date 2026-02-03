# TypeScript TS2589 Reproduction for @convex-dev/migrations

Minimal reproduction for TypeScript error **TS2589: Type instantiation is excessively deep and possibly infinite** when using `@convex-dev/migrations` with multiple migration files.

## Issue

When migrations are split across multiple files (as recommended for maintainability), TypeScript produces TS2589 errors when:
1. Using the generated `api` or `internal` objects in migration files
2. Referencing the `api` in application code

The error appears at usage points like `internal.migrations["20250101_migration"].migrationName`, not at the import statement.

## Setup

This repo contains:
- A simple Convex schema with one table (`items`)
- Three migration files in `convex/migrations/`
- Shared migrations setup in `convex/migrations.ts`
- A small app file demonstrating `api` usage

## Reproduction Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Convex types:
   ```bash
   npm run dev
   ```
   (Let it generate types, then you can stop it with Ctrl+C)

3. Run TypeScript type checking:
   ```bash
   npm run typecheck
   ```

## Expected Result

TypeScript reports TS2589 errors in:
- `convex/migrations/20250101_add_flag.ts` at line 13-14
- `convex/migrations/20250102_backfill_flag.ts` at line 14-15
- `convex/migrations/20250103_cleanup_flag.ts` at line 14-15
- `src/usesApi.ts` at lines 3-4

## Current Workaround

The only current workaround is to consolidate all migrations into a single file, which defeats the purpose of organizing migrations chronologically into separate files.

Alternatively, you can suppress the error with `// @ts-ignore` or `// @ts-expect-error`, but this hides the type safety that TypeScript provides.

## Potential Fix

The maintainer suggested implementing a `defineMigration` function that takes `components.migrations` as a parameter, rather than using the shared constant `migrations` variable across multiple files. This functional approach could reduce the recursive type instantiation that causes TS2589.

Example of what this might look like:
```ts
// Instead of:
import { migrations } from "../migrations";
export const myMigration = migrations.define({ ... });

// Could be:
import { defineMigration } from "@convex-dev/migrations";
import { components } from "../_generated/api";
export const myMigration = defineMigration(components.migrations, { ... });
```

## Environment

- TypeScript: 5.7.2
- @convex-dev/migrations: 0.3.1
- convex: 1.18.4
- Node: 18+

## Related

See: https://github.com/get-convex/migrations/issues/28
