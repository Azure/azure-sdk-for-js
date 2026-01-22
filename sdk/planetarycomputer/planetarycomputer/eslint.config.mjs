import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-modules-only-named": "warn",
      "@azure/azure-sdk/ts-package-json-types": "warn",
      "@azure/azure-sdk/ts-package-json-engine-is-present": "warn",
      "@azure/azure-sdk/ts-package-json-files-required": "off",
      "@azure/azure-sdk/ts-package-json-main-is-cjs": "off",
      "tsdoc/syntax": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-shadow": "off",
      "@azure/azure-sdk/ts-use-interface-parameters": "off",
      "@azure/azure-sdk/ts-naming-options": "off",
      "n/no-unsupported-features/node-builtins": "off",
      "no-param-reassign": "off",
    },
  },
]);
