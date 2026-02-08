/**
 * Complex frontend API usage patterns that trigger TS2589.
 *
 * These patterns are standard Convex usage but can hit TS2589 when:
 * 1. Multiple Convex components are installed (migrations + workflow + aggregate)
 * 2. Many modules exist
 * 3. Deep internal.* path access is used
 */
import type { FunctionReturnType, FilterApi } from "convex/server";
import { api, internal, components } from "../convex/_generated/api";

// Pattern 1: Accessing deep internal paths
// This can trigger TS2589 with complex type inference
type InternalQueries = typeof internal.queries;
type InternalMutations = typeof internal.mutations;
type InternalWorkflows = typeof internal.workflows;

// Pattern 2: FunctionReturnType with internal functions
type GetInternalReturn = FunctionReturnType<typeof internal.queries.getInternal>;
type UpdateFlagInternalReturn = FunctionReturnType<typeof internal.mutations.updateFlagInternal>;
type ProcessItemWorkflowReturn = FunctionReturnType<typeof internal.workflows.processItemWorkflow>;

// Pattern 3: Accessing component types
type WorkflowComponent = typeof components.workflow;
type MigrationsComponent = typeof components.migrations;
type AggregateComponent = typeof components.itemAggregate;

// Pattern 4: Complex type operations
type ApiKeys = keyof typeof api;
type InternalKeys = keyof typeof internal;

// Pattern 5: FunctionReference extraction
type PublicQueryRef = typeof api.queries.list;
type InternalQueryRef = typeof internal.queries.getInternal;
type WorkflowRef = typeof internal.workflows.processItemWorkflow;

// Export types to avoid unused warnings
export type {
  InternalQueries,
  InternalMutations,
  InternalWorkflows,
  GetInternalReturn,
  UpdateFlagInternalReturn,
  ProcessItemWorkflowReturn,
  WorkflowComponent,
  MigrationsComponent,
  AggregateComponent,
  ApiKeys,
  InternalKeys,
  PublicQueryRef,
  InternalQueryRef,
  WorkflowRef,
};

// Export refs to use them
export const listRef = api.queries.list;
export const getInternalRef = internal.queries.getInternal;
export const updateFlagInternalRef = internal.mutations.updateFlagInternal;
export const processWorkflowRef = internal.workflows.processItemWorkflow;
