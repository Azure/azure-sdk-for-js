import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
      "n/no-process-exit": "off",
    },
  },
]);
