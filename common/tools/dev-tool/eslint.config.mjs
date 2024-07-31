import eslint from "@eslint/js";
import typescriptEsLint from "typescript-eslint";

export default typescriptEsLint.config(
  {
    ignores: ["**/test/samples/files/expectations/**/*.*"],
  },
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
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
    },
  },
);
