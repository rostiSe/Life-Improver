import { customType, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { entity } from "./entity"

/**
 * Custom Drizzle type for pgvector's vector column.
 * Dimensions: 1536 to match text-embedding-3-small output.
 */
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return "vector(1536)"
  },
  toDriver(value: number[]): string {
    return `[${value.join(",")}]`
  },
  fromDriver(value: string): number[] {
    return value
      .slice(1, -1)
      .split(",")
      .map((n) => parseFloat(n))
  },
})

/**
 * Stores OpenAI embeddings for any entity.
 * Used for semantic search and AI context retrieval.
 */
export const embedding = pgTable("embedding", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  model: text("model").notNull().default("text-embedding-3-small"),
  embedding: vector("embedding").notNull(),
  content: text("content").notNull(), // the text that was embedded
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Embedding = typeof embedding.$inferSelect
export type NewEmbedding = typeof embedding.$inferInsert
