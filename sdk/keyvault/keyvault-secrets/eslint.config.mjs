import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
  {
    files: [
      "src/api/**/*.ts",
      "src/classic/**/*.ts",
      "src/models/**/*.ts",
      "src/static-helpers/**/*.ts",
      "src/restorePollerHelpers.ts",
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "tsdoc/syntax": "off",
      "spaced-comment": "off",
      "no-useless-escape": "off",
      "no-unused-expressions": "off",
    },
  },
]);
