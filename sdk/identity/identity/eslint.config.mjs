import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  { ignores: ["test/manual*"] },
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
]);
