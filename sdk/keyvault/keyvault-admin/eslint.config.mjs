import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  { ignores: ["src/generated"] },
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "@typescript-eslint/no-this-alias": "off",
      "no-use-before-define": "warn",
    },
  },
];
