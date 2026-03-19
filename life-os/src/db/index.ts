import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as agentLogSchema from "./schema/agentLog"
import * as calendarEventSchema from "./schema/calendarEvent"
import * as embeddingSchema from "./schema/embedding"
import * as entitySchema from "./schema/entity"
import * as habitLogSchema from "./schema/habitLog"
import * as habitSchema from "./schema/habit"
import * as journalSchema from "./schema/journal"
import * as projectSchema from "./schema/project"
import * as referenceSchema from "./schema/reference"
import * as taskSchema from "./schema/task"

const schema = {
  ...entitySchema,
  ...referenceSchema,
  ...embeddingSchema,
  ...journalSchema,
  ...taskSchema,
  ...projectSchema,
  ...habitSchema,
  ...habitLogSchema,
  ...calendarEventSchema,
  ...agentLogSchema,
}

const connectionString = process.env["DATABASE_URL"]

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Disable prefetch for Supabase transaction pooler mode
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
