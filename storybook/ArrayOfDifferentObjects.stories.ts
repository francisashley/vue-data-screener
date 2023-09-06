import type { Meta, StoryObj } from "@storybook/vue";
import DataScreener from "../src/components/DataScreener.vue";

const meta: Meta<typeof DataScreener> = {
  title: "Data/ArrayOfDifferentObjects",
  component: DataScreener,
};

export default meta;
type Story = StoryObj<typeof DataScreener>;

export const ArrayOfDifferentObjects: Story = {
  args: {
    data: [
      { type: "fruit", name: "Orange" },
      { id: 122, address: "42 Park Avenue" },
      { country: "UK", name: "Great Britain", flag_colours: "Red, white and blue" },
    ],
  },
};
