import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
    rules: {
      "@azure/azure-sdk/ts-package-json-files-required": "off",
    },
  },
]);
