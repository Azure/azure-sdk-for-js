const path = require("path");

module.exports = {
  entry: "./dist-esm/src/index.js",
  output: {
    filename: "index.browser.js",
    library: 'WebPubSubClient',
    path: path.resolve(__dirname, "dist-browser")
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      "events": require.resolve("events/")
    }
  }
};