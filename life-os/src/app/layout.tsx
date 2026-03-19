import type { Metadata } from "next"
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-text-primary">{children}</body>
    </html>
  )
}
