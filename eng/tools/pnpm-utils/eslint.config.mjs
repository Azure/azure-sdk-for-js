import eslint from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["./update-azurelkg.js"],
    rules: eslint.configs.recommended.rules,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
