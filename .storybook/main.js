const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-postcss",
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
