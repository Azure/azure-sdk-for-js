import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "n/no-unsupported-features/node-builtins": "off",
      "n/no-process-exit": "off",
    },
  },
];
