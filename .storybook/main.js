
module.exports = {
  stories: [
    "../storybook/Default.stories.js",
    "../storybook/WithRawToggle.stories.js",
    "../storybook/WithoutHeaders.stories.js",
    "../storybook/PickFields.stories.js",
    "../storybook/ArrayOfObjects.stories.js",
    "../storybook/ArrayOfDifferentObjects.stories.js",
    "../storybook/ArrayOfArrayOfPrimitives.stories.js",
    "../storybook/FailsWhenProvidedInvalidData.stories.js",
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
