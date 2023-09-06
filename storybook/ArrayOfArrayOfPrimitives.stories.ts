import type { Meta, StoryObj } from "@storybook/vue";
import DataScreener from "../src/components/DataScreener.vue";
import primitivesData from "../fixtures/primitives-data.json";

const meta: Meta<typeof DataScreener> = {
  title: "Data/ArrayOfArrayOfPrimitives",
  component: DataScreener,
};

export default meta;
type Story = StoryObj<typeof DataScreener>;

export const ArrayOfArrayOfPrimitives: Story = {
  args: {
    data: primitivesData,
  },
};
