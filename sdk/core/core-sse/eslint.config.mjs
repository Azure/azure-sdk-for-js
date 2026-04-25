import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.config([
    {
      files: ["src/models.ts", "src/sse.ts", "src/utils.ts", "src/types.ts"],
      rules: {
        "n/no-unsupported-features/node-builtins": "off",
      },
    },
  ]),
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts", "test/**/*.mts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
];
