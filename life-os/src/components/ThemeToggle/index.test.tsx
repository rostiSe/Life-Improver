import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi, beforeEach } from "vitest"

// next-themes must be mocked — it relies on DOM APIs not available in jsdom
const mockSetTheme = vi.fn()
const mockUseTheme = vi.fn()

vi.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}))

// Import AFTER mock setup
const { ThemeToggle } = await import("./index")

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme })
  })

  describe("icon-only variant", () => {
    it("renders a button", () => {
      render(<ThemeToggle variant="icon-only" />)
      expect(screen.getByRole("button")).toBeDefined()
    })

    it("has an accessible label", () => {
      render(<ThemeToggle variant="icon-only" />)
      const btn = screen.getByRole("button")
      expect(btn.getAttribute("aria-label")).toBeTruthy()
    })

    it("toggles to dark when current theme is light", async () => {
      const user = userEvent.setup()
      render(<ThemeToggle variant="icon-only" />)
      await user.click(screen.getByRole("button"))
      expect(mockSetTheme).toHaveBeenCalledWith("dark")
    })

    it("toggles to light when current theme is dark", async () => {
      mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme })
      const user = userEvent.setup()
      render(<ThemeToggle variant="icon-only" />)
      await user.click(screen.getByRole("button"))
      expect(mockSetTheme).toHaveBeenCalledWith("light")
    })

    it("does not render a visible text label", () => {
      render(<ThemeToggle variant="icon-only" />)
      expect(screen.queryByText(/theme/i)).toBeNull()
      expect(screen.queryByText(/mode/i)).toBeNull()
    })
  })

  describe("icon-label variant", () => {
    it("renders a visible text label when theme is light", () => {
      render(<ThemeToggle variant="icon-label" />)
      expect(screen.getByText(/dark mode/i)).toBeDefined()
    })

    it("renders a visible text label when theme is dark", () => {
      mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme })
      render(<ThemeToggle variant="icon-label" />)
      expect(screen.getByText(/light mode/i)).toBeDefined()
    })

    it("toggles theme on click", async () => {
      const user = userEvent.setup()
      render(<ThemeToggle variant="icon-label" />)
      await user.click(screen.getByRole("button"))
      expect(mockSetTheme).toHaveBeenCalledWith("dark")
    })
  })
})
