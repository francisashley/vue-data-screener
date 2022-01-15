import DataScreener from "../../src/DataScreener.vue";
import data from "../../fixtures/data.json";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Usage/WithRawToggle",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const WithRawToggle = Template.bind({});
WithRawToggle.args = { data: data, withRawToggle: true };
