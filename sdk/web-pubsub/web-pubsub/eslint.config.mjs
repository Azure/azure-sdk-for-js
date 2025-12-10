import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
]);
