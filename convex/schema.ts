import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    completed: v.boolean(),
    order: v.number(),
    userId: v.optional(v.string()), // For future auth
    createdAt: v.number(),
  }).index("by_order", ["order"]),

  userPreferences: defineTable({
    userId: v.string(),
    theme: v.union(v.literal("light"), v.literal("dark")),
  }).index("by_user", ["userId"]),
});
