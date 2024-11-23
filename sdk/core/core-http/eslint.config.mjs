import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    "rules": {
      "@azure/azure-sdk/ts-use-interface-parameters": "off",
      "@azure/azure-sdk/ts-apiextractor-json-types": "off",
      "@azure/azure-sdk/ts-package-json-types": "off",
      "@azure/azure-sdk/ts-package-json-module": "off",
      "@azure/azure-sdk/ts-package-json-files-required": "off"
    },
  },
];
