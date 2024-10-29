import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-engine-is-present": "off",
      "@azure/azure-sdk/ts-package-json-name": "off",
    },
  },
];
