import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  {
    ignores: ["test/stress"],
  },
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-types": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.tests.json"],
      },
    },
  },
  {
    files: ["*.md/*.ts"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
];
