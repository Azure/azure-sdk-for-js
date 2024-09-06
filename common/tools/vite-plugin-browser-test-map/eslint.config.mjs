import eslintJs from "@eslint/js";
import tsEsLint from "typescript-eslint";

export default tsEsLint.config(
  { ignores: ["*.config.{js,cjs,mjs}"] },
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
  tsEsLint.configs.eslintRecommended,
);
