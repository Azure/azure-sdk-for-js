import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "tsdoc/syntax": "warn",
      "@azure/azure-sdk/ts-modules-only-named": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.test.json"],
      },
    },
  },
]);
