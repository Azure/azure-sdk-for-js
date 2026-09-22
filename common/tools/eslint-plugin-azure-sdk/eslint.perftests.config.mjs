import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tsEsLint from "typescript-eslint";

export default defineConfig(
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
