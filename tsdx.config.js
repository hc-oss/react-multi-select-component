const postcss = require("rollup-plugin-postcss");

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        minimize: true,
      })
    );
    return config;
  },
};
