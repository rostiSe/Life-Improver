import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { entity } from "./entity"

export const habitFrequencyEnum = pgEnum("habit_frequency", [
  "daily",
  "weekly",
  "monthly",
])

export const habit = pgTable("habit", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  frequency: habitFrequencyEnum("frequency").notNull().default("daily"),
  targetCount: integer("target_count").notNull().default(1), // times per frequency period
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
})

export type Habit = typeof habit.$inferSelect
export type NewHabit = typeof habit.$inferInsert
