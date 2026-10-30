import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.config([]),
  {
    files: ["test/scripts/**/*.js"],
    rules: {
      // JavaScript type annotations use JSDoc syntax, not TSDoc.
      "tsdoc/syntax": "off",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
];
