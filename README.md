# TypeScript TS2589 Reproduction for @convex-dev/migrations

Minimal reproduction for TypeScript error **TS2589: Type instantiation is excessively deep and possibly infinite** when using `@convex-dev/migrations` with multiple migration files.

This reproduction was created for https://github.com/get-convex/migrations/issues/28

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

2. Run TypeScript type checking:
   ```bash
   npm run typecheck
   ```

Note: The `convex/_generated/` types are pre-generated and checked into this repo (normally they're gitignored). This allows you to reproduce the issue immediately without setting up a Convex project.

## Expected Result

TypeScript reports TS2589 errors:

```
convex/migrations/20250101_add_flag.ts(18,3): error TS2589: Type instantiation is excessively deep and possibly infinite.
src/usesApi.ts(4,32): error TS2589: Type instantiation is excessively deep and possibly infinite.
```

Additional cascading errors (TS2339) may also appear as a result of the type instantiation failure.

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
