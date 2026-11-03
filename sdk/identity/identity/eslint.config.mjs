import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  { ignores: ["test/manual*"] },
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      "@azure/azure-sdk/ts-no-invalid-test-imports": "error",
    },
  },
]);
