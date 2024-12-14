import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-config-include": "off",
    }
  },
]);
