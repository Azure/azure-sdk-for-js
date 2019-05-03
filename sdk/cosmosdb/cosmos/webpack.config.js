var path = require("path");
var webpack = require("webpack");

module.exports = (env, argv) => ({
  entry: "./lib/src/index.js",
  node: {
    buffer: true,
    net: "mock",
    tls: "mock"
  },
  output: {
    filename: "azurecosmos.js",
    path: path.resolve(__dirname, "lib", "dist"),
    library: "CosmosClient"
  },
  devtool: argv.mode === "production" ? "source-map" : "inline-source-map"
});
