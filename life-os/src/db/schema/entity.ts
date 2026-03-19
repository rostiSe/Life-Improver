import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Base entity table — every domain object registers here first.
 * Enables the any-to-any reference graph in reference.ts.
 */
export const entity = pgTable("entity", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(), // e.g. "journal", "task", "project", "habit"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Entity = typeof entity.$inferSelect
export type NewEntity = typeof entity.$inferInsert
