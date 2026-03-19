import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { entity } from "./entity"

/**
 * Any-to-any reference graph.
 * Links any two entities with a typed relationship.
 */
export const reference = pgTable("reference", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceId: uuid("source_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  targetId: uuid("target_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  relationshipType: text("relationship_type").notNull(), // e.g. "blocks", "related_to", "child_of"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Reference = typeof reference.$inferSelect
export type NewReference = typeof reference.$inferInsert
