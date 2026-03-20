"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { themeToggleVariants, type ThemeToggleVariants } from "./index.styles"

type ThemeToggleProps = ThemeToggleVariants

const ICON_SIZE = 16

/**
 * ThemeToggle — switches between light and dark mode.
 *
 * Reads the current theme from next-themes and toggles to the opposite.
 * Dark mode is applied via `[data-theme="dark"]` on `<html>` — never via
 * Tailwind's `dark:` class variants.
 *
 * @example
 * <ThemeToggle variant="icon-only" />
 * <ThemeToggle variant="icon-label" />
 */
export function ThemeToggle({ variant = "icon-only" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"
  const label = isDark ? "Light mode" : "Dark mode"

  function handleToggle() {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      className={themeToggleVariants({ variant })}
      onClick={handleToggle}
      aria-label={label}
    >
      {isDark ? (
        <Sun size={ICON_SIZE} aria-hidden="true" />
      ) : (
        <Moon size={ICON_SIZE} aria-hidden="true" />
      )}
      {variant === "icon-label" && <span>{label}</span>}
    </button>
  )
}
