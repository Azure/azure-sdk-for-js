import eslint from "@eslint/js";
import typescriptEsLint from "typescript-eslint";

export default typescriptEsLint.config(
  {
    ignores: ["**/*.{js,cjs,mjs,d.ts}"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
      parser: typescriptEsLint.parser,
    },
  },
  {
    files: ["test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.test.json",
      },
      parser: typescriptEsLint.parser,
    },
  },
  eslint.configs.recommended,
  ...typescriptEsLint.configs.recommended,
  typescriptEsLint.configs.eslintRecommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
