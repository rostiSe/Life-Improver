import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { entity } from "./entity"

export const journal = pgTable("journal", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  title: text("title"),
  content: text("content").notNull().default(""), // TipTap JSON or plain text
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Journal = typeof journal.$inferSelect
export type NewJournal = typeof journal.$inferInsert
