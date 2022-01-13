import DataScreener from "./DataScreener.vue";
import data from "./fixtures/data.json";
import primitivesData from "./fixtures/primitives-data.json";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/DataScreener",
  component: DataScreener,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataScreener },
  template: '<data-screener v-bind="$props" />',
});

export const ArrayOfObjects = Template.bind({});
ArrayOfObjects.args = { data: data };

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

export const ArrayOfArrays = Template.bind({});
ArrayOfArrays.args = { data: primitivesData };

export const PickFields = Template.bind({});
PickFields.args = {
  data: data,
  pickFields: ["id", "first_name"],
};

export const FailsWhenProvidedInvalidData = Template.bind({});
FailsWhenProvidedInvalidData.args = { data: ["a", "b", "c", "d"] };
