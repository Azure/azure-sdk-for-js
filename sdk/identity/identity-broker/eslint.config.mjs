import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.default.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-module": "warn",
    },
  },
];
