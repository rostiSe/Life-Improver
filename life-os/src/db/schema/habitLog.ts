import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { habit } from "./habit"

export const habitLog = pgTable("habit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  habitId: uuid("habit_id")
    .notNull()
    .references(() => habit.id, { onDelete: "cascade" }),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  count: integer("count").notNull().default(1),
  note: text("note"),
})

export type HabitLog = typeof habitLog.$inferSelect
export type NewHabitLog = typeof habitLog.$inferInsert
