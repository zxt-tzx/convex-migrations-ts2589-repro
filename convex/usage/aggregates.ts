import { TableAggregate } from "@convex-dev/aggregate";
import { components } from "../_generated/api";
import type { DataModel, Id } from "../_generated/dataModel";

/**
 * Usage aggregate for tracking usage by company.
 */
export const usageByCompany = new TableAggregate<{
  Namespace: Id<"companies">;
  Key: [string, number];
  DataModel: DataModel;
  TableName: "usageEvents";
}>(components.usageByCompany, {
  namespace: (event) => event.companyId,
  sortKey: (event) => [event.eventType, event._creationTime],
  sumValue: (event) => event.amount,
});
