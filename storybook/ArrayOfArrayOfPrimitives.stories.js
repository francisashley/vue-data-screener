import DataScreener from "../src/components/DataScreener.vue";
import primitivesData from "../fixtures/primitives-data.json";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Data/ArrayOfArrayOfPrimitives",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const ArrayOfArrayOfPrimitives = Template.bind({});
ArrayOfArrayOfPrimitives.args = { data: primitivesData };
