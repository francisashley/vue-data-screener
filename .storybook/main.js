const path = require("path");

module.exports = {
  stories: [
    "../storybook/usage/Default.stories.js",
    "../storybook/usage/WithRawToggle.stories.js",
    "../storybook/usage/WithoutHeaders.stories.js",
    "../storybook/usage/PickFields.stories.js",
    "../storybook/data/ArrayOfObjects.stories.js",
    "../storybook/data/ArrayOfDifferentObjects.stories.js",
    "../storybook/data/ArrayOfArrayOfPrimitives.stories.js",
    "../storybook/errors/FailsWhenProvidedInvalidData.stories.js",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-docs"],
  framework: "@storybook/vue",
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
};
