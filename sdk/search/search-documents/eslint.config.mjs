import azsdkEslint from "@azure/eslint-plugin-azure-sdk";
import jsdoc from "eslint-plugin-jsdoc";

export default azsdkEslint.config([
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    plugins: { jsdoc },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.test.json", "./tsconfig.samples.json"],
      },
    },
    rules: { "jsdoc/multiline-blocks": ["warn", { noSingleLineBlocks: true }] },
  },
]);
