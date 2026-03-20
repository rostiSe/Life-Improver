import type { Meta, StoryObj } from "@storybook/nextjs"
import { ThemeToggle } from "./index"

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof ThemeToggle>

export const IconOnly: Story = {
  args: {
    variant: "icon-only",
  },
}

export const IconLabel: Story = {
  args: {
    variant: "icon-label",
  },
}
