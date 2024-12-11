import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.internal,
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.test.json"],
      },
    },
  },
];
