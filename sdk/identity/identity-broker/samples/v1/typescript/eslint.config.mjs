import eslint from "@eslint/js";
import typescriptEsLint from "typescript-eslint";

export default typescriptEsLint.config(
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
);
