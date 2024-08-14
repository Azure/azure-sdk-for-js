import eslintJs from "@eslint/js";
import tsEsLint from "typescript-eslint";

export default tsEsLint.config(
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
      parser: tsEsLint.parser,
    },
  },
  eslintJs.configs.recommended,
  ...tsEsLint.configs.recommended,
  tsEsLint.configs.eslintRecommended
);
