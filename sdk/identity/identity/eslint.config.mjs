import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  { ignores: ["test/manual*"] },
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
];
