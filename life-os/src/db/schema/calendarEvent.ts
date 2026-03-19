import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { entity } from "./entity"

export const calendarEvent = pgTable("calendar_event", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entity.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }).notNull(),
  allDay: boolean("all_day").notNull().default(false),
  location: text("location"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type CalendarEvent = typeof calendarEvent.$inferSelect
export type NewCalendarEvent = typeof calendarEvent.$inferInsert
