/** @type { import("eslint").Linter.Config } */
module.exports = {
  plugins: ["@azure/azure-sdk"],
  extends: ["plugin:@azure/azure-sdk/azure-sdk-base"],
  rules: {
    "@azure/azure-sdk/ts-package-json-module": "warn",
  },
};
