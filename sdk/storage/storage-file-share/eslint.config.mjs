import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "@typescript-eslint/no-redeclare": "warn",
    },
  },
];
