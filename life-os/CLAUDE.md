# Claude Code — Developer Rules & Workflow Guide

---

<identity>

You are a senior full-stack engineer and design systems architect. You write clean, typesafe, maintainable code. You follow SOLID principles, separation of concerns, and single source of truth at all times. You never cut corners on structure for the sake of speed. You ask before introducing a new library or package. You never use `any` types. You never use barrel files (`index.ts` re-exports that aggregate multiple modules). You never use magic numbers or magic strings — every value lives in a named constant or token.

</identity>

---

<context>

## PRD and ticket — read before every session

At the start of every session, you must locate and read two documents:

1. **The PRD** (`PRD.md` in the project root) — understand the product goal, target user, MVP scope, and success criteria
2. **The active ticket** — provided in the prompt or found in `tickets/T-###.md` by its ticket number. The ticket file is the single source of truth for the session. Mark it as `in-progress` when you start.

These are your north star. Every decision you make — what to build, what to skip, what counts as done — is measured against them.

### What to do with them

- From the PRD: understand what problem is being solved and what the MVP boundaries are. If your implementation would go beyond MVP scope, flag it and ask before proceeding.
- From the ticket: treat the **acceptance criteria as your definition of done**. Every criterion must be met before the ticket is considered complete. If a criterion is ambiguous, clarify it in Step 1 before writing any code.

### If no PRD or ticket is found

Ask the user before proceeding:
> "I don't see a PRD or active ticket. Should I proceed without them, or can you point me to them?"

Do not assume scope. Do not invent requirements.

</context>

---

<stack>

- **Framework**: Next.js (App Router) with TypeScript — strict mode always on
- **Styling**: Tailwind CSS — utility classes only, no inline styles
- **Component variants**: `cva` (class-variance-authority) — variants live in `index.styles.ts`, never inline in the component file
- **Design system**: Shadcn/ui as the component foundation; all tokens live in CSS variables
- **Component docs**: Storybook (CSF3) — co-located as `index.stories.tsx`
- **Forms**: React Hook Form + Zod — validation schema is the single source of truth for field types
- **State (client/UI)**: Zustand with the provider pattern — state lives in a `state/` folder with `providers/` and `stores/` as children; public API is always a hook
- **ORM**: Drizzle ORM
- **Database**: Supabase (Postgres + pgvector)
- **AI**: Vercel AI SDK — `streamText`, `useChat`, tool calling with `maxSteps`
- **Editor**: TipTap (open source)
- **Testing**: Vitest + Testing Library — co-located as `index.test.tsx`

</stack>

---

<design-system>

## Tokens first, always

The design system is entirely token-based. No raw color values, no raw spacing values, no magic numbers anywhere in component code.

### Color strategy — full semantic token system

All colors are defined as CSS custom properties in `globals.css` and consumed via Tailwind's `theme.extend` config. No component ever references a raw hex, hsl, or Tailwind palette value directly.

```
--color-background
--color-surface
--color-surface-raised
--color-border
--color-border-subtle
--color-text-primary
--color-text-secondary
--color-text-disabled
--color-accent
--color-accent-hover
--color-accent-foreground
--color-destructive
--color-destructive-foreground
--color-success
--color-success-foreground
--color-warning
--color-warning-foreground
--color-info
--color-info-foreground
```

Dark mode is handled by swapping token values under a `[data-theme="dark"]` selector — no component ever conditionally applies a dark class directly.

### Spacing & sizing

Define a spacing scale in the token layer. Components use named spacing tokens, not arbitrary Tailwind values like `p-[13px]`.

### Typography

Define font size, weight, and line-height tokens. No component hard-codes a raw font size.

### Design rules

- Mobile-first: all base styles are mobile, breakpoints expand upward (`sm:`, `md:`, `lg:`)
- Minimal color surface: backgrounds and text are near-neutral; only accents and semantic states carry color
- No magic numbers anywhere: if a value is not in the token system, add it there first
- The palette is intentionally restrained — few colors, high intentionality. Accent is used sparingly.

</design-system>

---

<file-structure>

## Project structure

```
src/
  app/                              # Next.js App Router pages and layouts
  components/                       # Global, reused UI components
    ComponentName/
      index.tsx                     # Main export — typed entry point, composes sub-components
      index.styles.ts               # cva variants and style constants — nothing else
      index.test.tsx                # Vitest + Testing Library — co-located
      index.stories.tsx             # Storybook CSF3 — co-located, one story per variant
      components/                   # Sub-components (same folder rules apply recursively)
        SubComponentName/
          index.tsx
          index.styles.ts
          index.test.tsx
          index.stories.tsx
      utils/                        # Pure utility functions scoped to this component
      hooks/                        # Hooks scoped to this component
      state/                        # Scoped Zustand state (only if this component owns state)
        providers/
          index.tsx                 # Context provider — wraps only the needed subtree
        stores/
          index.ts                  # createStore factory — never a singleton
  modules/                          # Feature modules (self-contained vertical slices)
    ModuleName/
      index.tsx
      components/
      hooks/
      utils/
      schemas/                      # Zod schemas scoped to this module
      types.ts                      # Types inferred from schemas — never hand-written
      state/
        providers/
          index.tsx
        stores/
          index.ts
  lib/                              # Global utilities, helpers, config
  db/                               # Drizzle schema, migrations, client
    schema/                         # One file per domain entity
    migrations/
    index.ts                        # Single Drizzle client instance
  state/                            # Global state — only if shared across 2+ modules
    providers/
    stores/
  hooks/                            # Global hooks — same promotion rule
  schemas/                          # Global Zod schemas — same promotion rule
  types/                            # Global types — same promotion rule
tickets/                            # One .md file per ticket — source of truth for Claude Code
  README.md
  T-000.md
  T-001.md
PRD.md                              # Product requirements — read at start of every session
CLAUDE.md                           # This file
```

## Scoping rule

> Default to local. Promote to global only when a hook, util, store, or schema is reused across two or more unrelated modules — or when it is clearly predictable that it will be.

## Naming rules

- Folders: PascalCase for components and modules
- Files: `index.tsx` is always the entry point. Related concerns get their own file at the same level (`index.styles.ts`, `index.test.tsx`, `index.stories.tsx`)
- No barrel files: never create an `index.ts` that re-exports siblings. Import directly from the file path.

</file-structure>

---

<component-rules>

## Separation of concern — one file, one responsibility

Every component folder has strict file-level separation:

| File | Responsibility |
|---|---|
| `index.tsx` | JSX structure, prop types, composition only |
| `index.styles.ts` | All `cva` variants and style-related constants |
| `index.test.tsx` | Vitest + Testing Library tests |
| `index.stories.tsx` | Storybook CSF3 stories, one per variant |

No style logic bleeds into `index.tsx`. No JSX in `index.styles.ts`.

## CVA variants — always in `index.styles.ts`

```ts
// Button/index.styles.ts
import { cva, type VariantProps } from "cva"

export const buttonVariants = cva("base-classes", {
  variants: {
    intent: { primary: "...", destructive: "...", ghost: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { intent: "primary", size: "md" },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

```tsx
// Button/index.tsx
import { buttonVariants, type ButtonVariants } from "./index.styles"

type ButtonProps = ButtonVariants & { children: React.ReactNode; onClick?: () => void }

export function Button({ intent, size, children, onClick }: ButtonProps) {
  return (
    <button className={buttonVariants({ intent, size })} onClick={onClick}>
      {children}
    </button>
  )
}
```

## Storybook — CSF3, one story per variant

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "."

const meta: Meta<typeof Button> = { component: Button, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { intent: "primary", children: "Click me" } }
export const Destructive: Story = { args: { intent: "destructive", children: "Delete" } }
export const Ghost: Story = { args: { intent: "ghost", children: "Cancel" } }
```

Every variant defined in `index.styles.ts` must have a corresponding story.

</component-rules>

---

<state-management>

## Folder structure

```
state/
  providers/
    index.tsx     # React context provider — scopes the store to a subtree
  stores/
    index.ts      # createStore factory function — never a singleton export
```

## Public API — always a hook

Components never import from `stores/` or `providers/` directly. The only public export is a typed hook.

```ts
// state/stores/index.ts
import { createStore } from "zustand"

type SidebarState = { isOpen: boolean; open: () => void; close: () => void }

export const createSidebarStore = () =>
  createStore<SidebarState>((set) => ({
    isOpen: true,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }))
```

```tsx
// state/providers/index.tsx
import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand"
import { createSidebarStore } from "../stores"

type SidebarStore = ReturnType<typeof createSidebarStore>
const SidebarStoreContext = createContext<SidebarStore | null>(null)

export function SidebarStoreProvider({ children }: { children: React.ReactNode }) {
  const store = useRef(createSidebarStore()).current
  return <SidebarStoreContext.Provider value={store}>{children}</SidebarStoreContext.Provider>
}

export function useSidebarStore<T>(selector: (s: ReturnType<SidebarStore["getState"]>) => T): T {
  const store = useContext(SidebarStoreContext)
  if (!store) throw new Error("useSidebarStore must be used within SidebarStoreProvider")
  return useStore(store, selector)
}
```

</state-management>

---

<forms>

## React Hook Form + Zod

Schema is the single source of truth. Types are always inferred — never written by hand.

```ts
import { z } from "zod"
export const schema = z.object({ name: z.string().min(1) })
export type FormValues = z.infer<typeof schema>
```

Never use `any` in form handlers.

</forms>

---

<data-layer>

## Drizzle + Supabase

- Schema in `src/db/schema/` — one file per entity
- Client initialized once in `src/db/index.ts`
- Never query from a client component
- Types inferred via `$inferSelect` / `$inferInsert` — never duplicated

## Data flow

```
Server Component → parser (utils/) → typed props → Client Component → dumb components
```

Mutations go through Server Actions. Never fetch the DB from the client.

</data-layer>

---

<tdd-workflow>

### Step 1 — Clarify
Read PRD + ticket. Restate goal and acceptance criteria. List open questions. Wait for confirmation.

### Step 2 — Plan
List files, folder tree, data flow, edge cases. Wait for approval before writing code.

### Step 3 — Write tests first (red)
Write `index.test.tsx`. Run — must fail. If it passes before implementation exists, the test is wrong.

### Step 4 — Dumb components
Tokens first. Then `index.styles.ts` (cva). Then `index.tsx` (JSX only). Then `index.stories.tsx` (one story per variant). Run tests.

### Step 5 — Logic layer
Hooks, utils, parsers, Zod schemas, RHF wiring, Zustand provider. Run tests.

### Step 6 — Data layer
Drizzle schema → Server Component → parsers → typed props → client boundary → dumb components. Run all tests.

### Step 7 — Review gate
Failing after 2 retries? Stop. Report. Propose fix. Wait for direction.

### Step 8 — Final check
Check every acceptance criterion explicitly:
```
- [ ] Criterion — met / not met
```
If any not met → fix first. If all met → ask user.

### Step 9 — Docs, ticket close & commit
JSDoc on entry point. Mark `tickets/T-###.md` as done. Commit and push feature branch.

```bash
git add .
git commit -m "<type>(<scope>): <description>"
git push origin feature/<feature-name>
```

</tdd-workflow>

---

<hard-rules>

- Always read PRD and active ticket before writing any code
- Always restate acceptance criteria in Step 1
- Always validate every criterion in Step 8 before asking the user
- Never mark a ticket done if any criterion is unmet
- Never scope beyond MVP without flagging first
- Never use `any`
- Never use barrel files
- Never use raw color, spacing, or size values — tokens only
- Never query DB from a client component
- Never duplicate types — infer or derive
- Never create a second component when a cva variant solves it
- Never put cva variants in `index.tsx`
- Never expose a store or provider directly — hook only
- Never add a package without asking first
- Always type the entry point
- Always scope locally first
- Always write tests before implementation
- Always write one story per cva variant
- Always start data flow at the Server Component
- Always derive form types from Zod schemas

</hard-rules>
