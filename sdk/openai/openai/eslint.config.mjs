import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.src.json", "./tsconfig.tests.json"],
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
