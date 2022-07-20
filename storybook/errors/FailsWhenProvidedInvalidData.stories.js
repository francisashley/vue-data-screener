import DataScreener from "../../src/components/DataScreener.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "errors/FailsWhenProvidedInvalidData",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const FailsWhenProvidedInvalidData = Template.bind({});
FailsWhenProvidedInvalidData.args = { data: ["a", "b", "c", "d"] };
