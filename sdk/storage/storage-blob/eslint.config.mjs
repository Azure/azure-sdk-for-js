import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "@typescript-eslint/no-redeclare": "warn",
      "@azure/azure-sdk/ts-no-invalid-test-imports": "off",
    },
  },
]);
