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
    files: ["src/bin/gen-model.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      // shebang needs to come first
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
]);
