import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    name: v.string(),
    flag: v.optional(v.boolean()),
  }),
  usageEvents: defineTable({
    companyId: v.id("companies"),
    eventType: v.string(),
    amount: v.number(),
    resourceId: v.optional(v.id("items")),
  }),
  companies: defineTable({
    name: v.string(),
  }),
});
