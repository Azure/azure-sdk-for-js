import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["*.config.{js,cjs,mjs}"]),
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
      parser: typescriptEslint.parser,
    },
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  typescriptEslint.configs.eslintRecommended,
  {
    rules: {
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [0], ignoreArrayIndexes: true }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "arrow-body-style": ["error", "as-needed"],
      curly: "error",
      eqeqeq: "error",
      "no-console": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-multi-spaces": "error",
      "no-redeclare": "error",
      "no-useless-escape": "off",
      "prefer-template": "error",
    },
  },
);
