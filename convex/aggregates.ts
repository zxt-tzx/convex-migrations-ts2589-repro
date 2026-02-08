import { TableAggregate } from "@convex-dev/aggregate";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";

/**
 * TableAggregate for tracking items by flag status.
 * Using @convex-dev/aggregate component adds type complexity.
 */
export const itemsByFlag = new TableAggregate<{
  Key: number;
  DataModel: DataModel;
  TableName: "items";
}>(components.itemAggregate, {
  sortKey: (doc) => doc._creationTime,
  sumValue: (doc) => doc.flag ? 1 : 0,
});
