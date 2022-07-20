import DataScreener from "../../src/components/DataScreener.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Data/ArrayOfDifferentObjects",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const ArrayOfDifferentObjects = Template.bind({});
ArrayOfDifferentObjects.args = {
  data: [
    { type: "fruit", name: "Orange" },
    { id: 122, address: "42 Park Avenue" },
    {
      country: "UK",
      name: "Great Britain",
      flag_colours: "Red, white and blue",
    },
  ],
};
