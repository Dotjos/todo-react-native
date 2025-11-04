import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTheme = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const pref = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    return pref?.theme ?? "light";
  },
});

export const setTheme = mutation({
  args: {
    userId: v.string(),
    theme: v.union(v.literal("light"), v.literal("dark")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userPreferences")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { theme: args.theme });
    } else {
      await ctx.db.insert("userPreferences", {
        userId: args.userId,
        theme: args.theme,
      });
    }
  },
});
