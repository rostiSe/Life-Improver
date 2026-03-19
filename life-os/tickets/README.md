# Tickets

Each file in this folder represents one unit of work. Tickets are the single source of truth for Claude Code sessions.

## Format

```
T-###.md
```

## Status values

- `backlog` — not yet started
- `in-progress` — currently being worked on
- `done` — complete, all acceptance criteria met
- `blocked` — waiting on an external dependency

## Workflow

1. At the start of every session, read the PRD and the active ticket
2. Mark the ticket `in-progress` before writing any code
3. Restate acceptance criteria and wait for confirmation (Step 1 of TDD workflow)
4. Only mark `done` when every acceptance criterion is explicitly met
5. Commit with message: `<type>(<scope>): <description>` (conventional commits)

## Ticket index

| Ticket | Title | Status |
|--------|-------|--------|
| T-000 | Bootstrap — project foundation | done |
| T-001 | Design token system | backlog |
| T-002 | Navigation shell | backlog |
| T-003 | Journal module | backlog |
| T-004 | Task module | backlog |
| T-005 | Project module | backlog |
| T-006 | Habit module | backlog |
| T-007 | Habit log & streak | backlog |
| T-008 | Calendar module | backlog |
| T-009 | Dashboard | backlog |
| T-010 | Semantic search & embeddings | backlog |
| T-011 | AI daily agent | backlog |
| T-012 | AI weekly agent | backlog |
| T-013 | Auth — login/logout | backlog |
