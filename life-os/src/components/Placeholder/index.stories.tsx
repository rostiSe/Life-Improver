import type { Meta, StoryObj } from "@storybook/nextjs"
import { Placeholder } from "./index"

const meta: Meta<typeof Placeholder> = {
  component: Placeholder,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof Placeholder>

export const Default: Story = {
  args: {
    label: "Placeholder component — LifeOS bootstrap smoke test",
  },
}
