import azsdkEslint from "@azure/eslint-plugin-azure-sdk";
import { globalIgnores } from "eslint/config";

export default [
  ...azsdkEslint.config([
    {
      rules: {
        "@azure/azure-sdk/ts-naming-options": "warn",
        "@typescript-eslint/no-redeclare": "warn",
      },
    },
    globalIgnores(["**/src/crc64.js", "**/src/crc64_glue.js"]),
  ]),
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
];
