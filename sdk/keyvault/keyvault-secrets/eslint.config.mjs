import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-this-alias": "off",
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "no-use-before-define": "warn",
    },
  },
];
