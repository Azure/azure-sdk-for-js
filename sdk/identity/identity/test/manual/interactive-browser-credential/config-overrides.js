const webpack = require("webpack");

module.exports = function override(config) {
  const plugins = config.plugins || [];
  plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  );
  plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    })
  );
  config.plugins = plugins;
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    buffer: require.resolve("buffer/"),
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
  });
  config.resolve.fallback = fallback;
  return config;
};