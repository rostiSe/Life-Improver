import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import HomePage from "@/app/page"

describe("smoke: HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />)
    expect(screen.getByRole("main")).toBeDefined()
  })

  it("renders the LifeOS heading", () => {
    render(<HomePage />)
    expect(screen.getByText("LifeOS")).toBeDefined()
  })
})
