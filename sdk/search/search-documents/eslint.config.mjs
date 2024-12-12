import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    ignores: ["src/shims.d.ts"],
  },
  {
    files: ["samples-dev/**/*.ts"],
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
      // Suppresses errors for the custom TSDoc syntax we use for docs
      "tsdoc/syntax": "off",
    },
  },
]);
