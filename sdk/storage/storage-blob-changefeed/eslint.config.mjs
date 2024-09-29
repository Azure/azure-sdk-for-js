import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "@azure/azure-sdk/ts-versioning-semver": "warn",
    },
  },
];
