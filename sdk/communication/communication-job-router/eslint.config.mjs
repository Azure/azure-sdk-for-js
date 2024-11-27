import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      // Removing `src` would be a breaking change so leaving it for the package owners to address
      "@azure/azure-sdk/ts-package-json-files-required": "warn",
    },
  },
];
