import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    ignores: ["test/stress/"],
  },
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-types": "off",
    },
  },
];
