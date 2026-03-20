import { cva, type VariantProps } from "class-variance-authority"

export const themeToggleVariants = cva(
  // Base: button reset + flex centre + token colours + transition
  [
    "inline-flex cursor-pointer items-center justify-center gap-2",
    "rounded-md border border-border bg-surface",
    "text-text-secondary transition-colors",
    "hover:bg-surface-raised hover:text-text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
  ].join(" "),
  {
    variants: {
      variant: {
        "icon-only": "h-9 w-9 p-0",
        "icon-label": "h-9 px-3 py-2 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "icon-only",
    },
  },
)

export type ThemeToggleVariants = VariantProps<typeof themeToggleVariants>
