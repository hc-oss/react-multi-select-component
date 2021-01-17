module.exports = {
  stories: ["../stories/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
