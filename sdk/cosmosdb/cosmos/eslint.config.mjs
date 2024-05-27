// @ts-check
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  {
    ignores: ["**/src/utils/hashing/murmurHash.ts"],
  },
  ...azsdkEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        createDefaultProgram: true,
      },
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-duplicate-enum-values": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "dot-notation": "off",
      "some-rule": "off",
      "@azure/azure-sdk/ts-package-json-types": "warn",
      // cosmos does not use core-http yet so their methods do not yet accept abort controllers
      "@azure/azure-sdk/ts-apisurface-supportcancellation": "warn",
      // this rule requires introducing breaking changes, should be fixed by the cosmos team
      "@azure/azure-sdk/ts-naming-options": "warn",
      // left to the cosmos team make this rule error again
      "@azure/azure-sdk/ts-package-json-module": "warn",
      "@azure/azure-sdk/ts-doc-internal": "warn",

      // https://github.com/benmosher/eslint-plugin-import/issues/1816
      "import/no-extraneous-dependencies": "off",
    },
  },
];
