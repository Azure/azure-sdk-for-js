import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  { ignores: ["test/manual*"] },
  {
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
  {
    files: ["test/snippets.spec.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.src.json", "./tsconfig.tests.json"],
      },
    },
  },
]);
