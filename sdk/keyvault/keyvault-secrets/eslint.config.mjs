import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@typescript-eslint/no-this-alias": "off",
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "no-use-before-define": "warn",
    },
  },
]);
