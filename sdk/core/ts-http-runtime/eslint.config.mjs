import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-name": "warn",
      "@azure/azure-sdk/ts-versioning-semver": "warn",
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
]);
