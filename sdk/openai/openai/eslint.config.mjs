import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-engine-is-present": "warn",
      "@azure/azure-sdk/ts-package-json-module": "off",
      "@azure/azure-sdk/ts-package-json-main-is-cjs": "off",
      "@azure/azure-sdk/ts-package-json-types": "off",
      "@azure/azure-sdk/ts-package-json-files-required": "off",
      "no-restricted-imports": "warn",
    },
  },
];
