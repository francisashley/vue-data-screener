import type { Meta, StoryObj } from "@storybook/vue";
import DataScreener from "../src/components/DataScreener.vue";

const meta: Meta<typeof DataScreener> = {
  title: "errors/FailsWhenProvidedInvalidData",
  component: DataScreener,
};

export default meta;
type Story = StoryObj<typeof DataScreener>;

export const ArrayOfDifferentObjects: Story = {
  args: {
    data: ["a", "b", "c", "d"],
  },
};
