import DataScreener from "../../src/components/DataScreener.vue";
import data from "../..//fixtures/data.json";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Usage/WithoutHeader",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const WithoutHeader = Template.bind({});
WithoutHeader.args = { data: data, withHeader: false };
