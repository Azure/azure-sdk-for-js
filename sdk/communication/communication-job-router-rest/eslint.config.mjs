import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-modules-only-named": "warn",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts", "test/**/*.mts", "samples-dev/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
]);
