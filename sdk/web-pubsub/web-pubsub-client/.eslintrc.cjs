/** @type { import("eslint").Linter.Config } */
module.exports = {
  plugins: ["@azure/azure-sdk"],
  extends: ["plugin:@azure/azure-sdk/azure-sdk-base"],
  ignorePatterns: ["src/ws.browser.js"],
  rules: {
    "no-return-await": "off",
    "no-empty": "off",
    "no-constant-condition": "off",
  },
};
