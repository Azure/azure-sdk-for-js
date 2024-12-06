import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    ignores: ["test/stress"],
  },
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-types": "off",
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
