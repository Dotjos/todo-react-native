import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all tasks
export const getTasks = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("asc").collect();
  },
});

// Add a new task
export const addTask = mutation({
  args: {
    text: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      text: args.text,
      completed: false,
      order: args.order,
      createdAt: Date.now(),
    });
    return taskId;
  },
});

// Toggle task completion
export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    await ctx.db.patch(args.id, {
      completed: !task.completed,
    });
  },
});

// Delete a task
export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update task order (for drag and drop)
export const updateTasksOrder = mutation({
  args: {
    tasks: v.array(
      v.object({
        id: v.id("tasks"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const task of args.tasks) {
      await ctx.db.patch(task.id, { order: task.order });
    }
  },
});

// Update task text
export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.text });
  },
});
