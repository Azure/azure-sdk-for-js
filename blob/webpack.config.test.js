const path = require("path");

var webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: [
    // "@babel/polyfill", // Use babel or lightweight es6-promise
    "es6-promise/auto",
    "./lib/utils/polyfills.browser.ts",
    "./test/aborter.test.ts",
    "./test/appendbloburl.test.ts",
    "./test/bloburl.test.ts",
    "./test/blockbloburl.test.ts",
    "./test/containerurl.test.ts",
    "./test/pagebloburl.test.ts",
    "./test/serviceurl.test.ts",
    "./test/browser/highlevel.browser.test.ts"
  ],
  devtool: "source-map",
  output: {
    filename: "browser.test.js",
    path: path.resolve(__dirname, "browser", "test")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules|samples)/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new webpack.IgnorePlugin(/.*SharedKeyCredential/)],
  node: {
    fs: false,
    net: false,
    path: false,
    dns: false,
    tls: false,
    tty: false,
    v8: false,
    Buffer: false
  },
  performance: {
    hints: "warning",
    maxAssetSize: 300 * 1024 * 1024,
    maxEntrypointSize: 400 * 1024 * 1024
  }
};
