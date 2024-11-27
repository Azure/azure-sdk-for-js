import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  {
    ignores: ["test/stress"],
  },
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-types": "off",
    },
  },
];
