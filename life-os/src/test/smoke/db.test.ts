import { describe, expect, it, vi, beforeAll } from "vitest"

// Stub the postgres driver before the db module is loaded
vi.mock("postgres", () => {
  const client = vi.fn().mockReturnValue({})
  return { default: client }
})

// Stub drizzle-orm to avoid needing a real connection
vi.mock("drizzle-orm/postgres-js", () => ({
  drizzle: vi.fn().mockReturnValue({ _: "drizzle-instance" }),
}))

describe("smoke: Drizzle client", () => {
  beforeAll(() => {
    process.env["DATABASE_URL"] = "postgres://localhost/test"
  })

  it("initialises the db client without throwing", async () => {
    const { db } = await import("@/db/index")
    expect(db).toBeDefined()
  })
})
