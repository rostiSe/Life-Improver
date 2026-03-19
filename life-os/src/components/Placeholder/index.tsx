type PlaceholderProps = {
  label: string
}

/**
 * Placeholder component — exists only to satisfy the Storybook smoke test.
 * Will be removed once real components are built in T-001+.
 */
export function Placeholder({ label }: PlaceholderProps) {
  return (
    <div className="rounded-md border border-border bg-surface p-4 text-text-secondary">
      {label}
    </div>
  )
}
