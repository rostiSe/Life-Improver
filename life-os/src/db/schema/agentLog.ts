import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const agentRunTypeEnum = pgEnum("agent_run_type", ["daily", "weekly"])

export const agentStatusEnum = pgEnum("agent_status", [
  "running",
  "completed",
  "failed",
])

export const agentLog = pgTable("agent_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  runType: agentRunTypeEnum("run_type").notNull(),
  status: agentStatusEnum("status").notNull().default("running"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  durationMs: integer("duration_ms"),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  summary: text("summary"),
  error: text("error"),
  metadata: jsonb("metadata"), // arbitrary structured data from the agent run
})

export type AgentLog = typeof agentLog.$inferSelect
export type NewAgentLog = typeof agentLog.$inferInsert
