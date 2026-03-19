# LifeOS — Product Requirements Document

**Version**: 1.0
**Date**: 2026-03-19
**Status**: Active

---

## Problem

Knowledge workers and high-performers have their life spread across a dozen disconnected tools — Notion for notes, Todoist for tasks, Google Calendar for events, a habit app, a journaling app. There is no single place that understands the whole picture. Patterns go unnoticed. Weekly reviews are manual and painful. There is no system that can look across everything and tell you what matters.

---

## Target User

**Primary**: A single, tech-savvy individual (the builder of this system) who wants a personal operating system — a single source of truth for all life data, augmented by an AI agent that surfaces patterns, flags risks, and generates weekly reviews automatically.

**MVP scope**: Single user. No multi-tenancy. Authentication is email/password via Supabase Auth.

---

## Product Vision

LifeOS is a personal life operating system. It captures everything — journal entries, tasks, projects, habits, calendar events — in a unified data model. An AI agent runs daily and weekly to generate insights, surface connections, and produce structured reviews. The user interacts via a clean, minimal web app.

---

## MVP Scope

The MVP delivers:

1. **Design token system** — full semantic token layer, light/dark mode
2. **Navigation shell** — sidebar with module links, theme toggle
3. **Journal module** — create/edit daily entries with TipTap editor
4. **Task module** — create, update, and complete tasks; link to projects
5. **Project module** — create and manage projects; list linked tasks
6. **Habit module** — define habits, log completions, view streak
7. **Calendar module** — create and view events in a simple list/grid
8. **AI daily agent** — Vercel Cron job, runs at midnight, summarises the day
9. **AI weekly agent** — Vercel Cron job, runs Sunday night, generates weekly review
10. **Semantic search** — embed all content via text-embedding-3-small, enable similarity search
11. **Dashboard** — single-page summary of today's tasks, habits, recent journal, upcoming events

**Out of MVP scope** (do not build unless a ticket exists):
- Mobile app
- Multi-user / sharing
- Third-party integrations (Google Calendar sync, Notion import, etc.)
- Billing / subscriptions
- Public API

---

## Tech Stack

See CLAUDE.md for the full stack definition. Key decisions:

- **Next.js 16 App Router** — Server Components for data fetching, Server Actions for mutations
- **Supabase** — Postgres database + pgvector + Auth
- **Drizzle ORM** — type-safe queries, schema-first, migrations via drizzle-kit
- **Vercel AI SDK** — AI agent orchestration with `streamText` and tool calling
- **OpenAI** — `text-embedding-3-small` for embeddings, `gpt-4o` for agent reasoning
- **TipTap** — rich text editor for journal and project notes

---

## Data Model Overview

All domain objects (journal, task, project, habit, calendar event) register as rows in the `entity` table. This enables the reference graph (`reference` table) to link any two objects. Embeddings are stored in the `embedding` table against the entity.

Tables:
- `entity` — base registry
- `reference` — any-to-any link graph
- `embedding` — pgvector embeddings (1536 dimensions, text-embedding-3-small)
- `journal` — daily journal entries
- `task` — tasks with status, due date
- `project` — projects grouping tasks
- `habit` — habit definitions
- `habit_log` — individual habit completions
- `calendar_event` — events with start/end times
- `agent_log` — log of AI agent runs

---

## Success Criteria (MVP)

- [ ] User can log in and out securely
- [ ] User can create, edit, and delete journal entries with rich text
- [ ] User can create, update status, and delete tasks
- [ ] User can create projects and link tasks to them
- [ ] User can define habits and log daily completions
- [ ] User can view a habit streak
- [ ] User can create and view calendar events
- [ ] Daily agent runs at midnight and writes a summary to `agent_log`
- [ ] Weekly agent runs Sunday at 23:00 and writes a structured review to `agent_log`
- [ ] All content is embedded on save and searchable by semantic similarity
- [ ] Dashboard shows today at a glance
- [ ] Light and dark mode work via token swap on `[data-theme="dark"]`
- [ ] `npm run build` is clean
- [ ] `npm run test` is green
- [ ] `npm run lint` is clean

---

## Non-Functional Requirements

- **Performance**: Core pages load under 1s on a cold Vercel function start
- **Type safety**: Zero `any` types in the codebase
- **Accessibility**: Semantic HTML, keyboard navigable, WCAG AA contrast on all text
- **Security**: No DB queries from client components; all mutations via Server Actions; cron routes protected by `CRON_SECRET`
