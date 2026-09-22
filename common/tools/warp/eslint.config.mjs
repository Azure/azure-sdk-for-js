import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import typescriptEsLint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(
  globalIgnores(["**/*.{js,cjs,mjs,d.ts}"]),
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.src.json",
        tsconfigRootDir: __dirname,
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
        tsconfigRootDir: __dirname,
      },
      parser: typescriptEsLint.parser,
    },
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEsLint.configs.recommended,
      ...typescriptEsLint.configs.recommendedTypeChecked,
      typescriptEsLint.configs.eslintRecommended,
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
);
