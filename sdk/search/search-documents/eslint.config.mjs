import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    // Justification: these files are auto-generated and we don't want to modify them.
    files: [
      "src/models/**/*.ts",
      "src/search/api/**/*.ts",
      "src/static-helpers/**/*.ts",
      "src/restorePollerHelpers.ts",
    ],
    rules: {
      "tsdoc/syntax": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-shadow": "off",
      "no-useless-escape": "off",
    },
  },
]);
