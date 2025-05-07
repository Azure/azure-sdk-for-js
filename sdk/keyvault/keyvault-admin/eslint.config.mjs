import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@azure/azure-sdk/ts-naming-options": "warn"
    }
  },
]);
