import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
z      "@typescript-eslint/no-redeclare": "warn",
    },
  },
]);
