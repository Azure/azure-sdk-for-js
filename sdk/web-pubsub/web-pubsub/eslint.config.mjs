import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
]);
