import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  {
    ignores: ["src/shims.d.ts"],
  },
  ...azsdkEslint.configs.recommended,
  {
    files: ["samples-dev/**/*.ts"],
    rules: {
      // Suppresses errors for the custom TSDoc syntax we use for docs
      "tsdoc/syntax": "off",
    },
  },
];
