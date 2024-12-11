import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/**/*.ts"],
    rules: {
      "@azure/azure-sdk/github-source-headers": "off",
      "@azure/azure-sdk/ts-use-interface-parameters": "off",
      "tsdoc/syntax": "off",
    },
  },
]);
