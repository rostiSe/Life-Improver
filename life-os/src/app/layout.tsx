import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider/index"
import "./globals.css"

export const metadata: Metadata = {
  title: "LifeOS",
  description: "Your personal life operating system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
