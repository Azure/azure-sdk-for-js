const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    aliasFields: ["browser"],
    alias: {
      process: "process/browser",
    },
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      "process/browser": require.resolve("process/browser"),
    },
  },
  mode: "development",
  devServer: {
    static: ".",
  },
  optimization: {
    usedExports: true,
  },
};
