export default {
  stories: [
    "../storybook/Default.stories.ts",
    "../storybook/WithRawToggle.stories.ts",
    "../storybook/WithoutHeaders.stories.ts",
    "../storybook/PickFields.stories.ts",
    "../storybook/ArrayOfObjects.stories.ts",
    "../storybook/ArrayOfDifferentObjects.stories.ts",
    "../storybook/ArrayOfArrayOfPrimitives.stories.ts",
    "../storybook/FailsWhenProvidedInvalidData.stories.ts",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/vue-vite",
    options: {}
  },

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        require.resolve("vue-style-loader"),
        require.resolve("css-loader"),
        require.resolve("sass-loader"),
      ],
    });

    return config;
  },

  docs: {
    autodocs: true
  }
};
