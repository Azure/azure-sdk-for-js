const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const version = require("./package.json").version;
const zipFileName = `azurestoragejs.blob-${version}`;
const banner = [
  `Azure Storage SDK for JavaScript - Blob, ${version}`,
  "Copyright (c) Microsoft and contributors. All rights reserved."
].join("\n");

module.exports = {
  mode: "production",
  entry: {
    "azure-storage.blob": "./lib/index.browser.ts",
    "azure-storage.blob.min": "./lib/index.browser.ts"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  // devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "browser"),
    libraryTarget: "umd",
    library: "azblob"
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
  plugins: [
    new CopyWebpackPlugin(["browser/ThirdPartyNotices.txt"]),
    new webpack.BannerPlugin({
      banner: banner,
      raw: false
    }),
    new ZipPlugin({
      filename: zipFileName,
      pathPrefix: zipFileName,
      include: [
        "ThirdPartyNotices.txt",
        "azure-storage.blob.js",
        "azure-storage.blob.min.js"
      ],
      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false
      },
      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
      zipOptions: {
        forceZip64Format: false
      }
    })
  ],
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
