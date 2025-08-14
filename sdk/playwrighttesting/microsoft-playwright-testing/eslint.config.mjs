import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-files-required": "off",
      "@azure/azure-sdk/ts-use-cjs-polyfill": "off", // This is a deprecated package
    },
  },
]);
