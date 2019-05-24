import * as webpack from "webpack";
import * as glob from "glob";
import * as path from "path";

const config: webpack.Configuration = {
  entry: glob.sync(path.join(__dirname, "test/**/*[^node\.].ts")),
  mode: "development",
  devtool: "source-map",
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: false,
    publicPath: false
  },
  output: {
    filename: "msRest.browser.test.js",
    path: path.resolve(__dirname, "test")
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(\.).+util\/base64/, path.resolve(__dirname, "./lib/util/base64.browser.ts")),
    new webpack.NormalModuleReplacementPlugin(/(\.).+util\/xml/, path.resolve(__dirname, "./lib/util/xml.browser.ts")),
    new webpack.NormalModuleReplacementPlugin(/(\.).+defaultHttpClient/, path.resolve(__dirname, "./lib/defaultHttpClient.browser.ts")),
    new webpack.NormalModuleReplacementPlugin(/(\.).+msRestUserAgentPolicy/, path.resolve(__dirname, "./lib/policies/msRestUserAgentPolicy.browser.ts")),
    new webpack.NormalModuleReplacementPlugin(/(\.).+proxyPolicy/, path.resolve(__dirname, "./lib/policies/proxyPolicy.browser.ts"))
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules)/,
        options: { configFile: path.join(__dirname, "./tsconfig.es.json") }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  node: {
    Buffer: "mock",
    dns: false,
    fs: "empty",
    net: "empty",
    path: "empty",
    process: "mock",
    stream: "empty",
    tls: "empty",
    tty: false,
    tunnel: "empty",
    v8: false,
  }
};

export = config;
