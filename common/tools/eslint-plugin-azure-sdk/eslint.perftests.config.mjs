import eslintJs from "@eslint/js";
import tsEsLint from "typescript-eslint";

export default tsEsLint.config(
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      parser: tsEsLint.parser,
    },
  },
  eslintJs.configs.recommended,
  ...tsEsLint.configs.recommended,
  tsEsLint.configs.eslintRecommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
);
