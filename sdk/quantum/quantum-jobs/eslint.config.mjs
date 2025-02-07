import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/github-source-headers": "warn",
      "@azure/azure-sdk/ts-use-interface-parameters": "warn",
      "tsdoc/syntax": "warn",
    }
  },
]);
