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
      // Suppresses spurious missing dependency error as ESLint thinks the sample's runtime deps
      // should be runtime deps for us too
      "import/no-extraneous-dependencies": "off",
    },
  },
];
