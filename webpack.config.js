var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./lib/index.js",
    node: {
        buffer: true,
        net: "mock",
        tls: "mock"
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ],
    output: {
        filename: "azurecosmos.js",
        path: path.resolve(__dirname, "lib", "dist"),
        library: "CosmosClient"
    },
    devtool: "inline-source-map"
};