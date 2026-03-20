"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
}

/**
 * Wraps the app with next-themes provider.
 * Uses `attribute="data-theme"` so dark mode is driven by
 * `[data-theme="dark"]` on `<html>` — never by Tailwind's `dark:` classes.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
