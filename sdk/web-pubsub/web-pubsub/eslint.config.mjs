import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    rules: {
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
  {
    files: [
      "src/api/**/*.ts",
      "src/classic/**/*.ts",
      "src/models/**/*.ts",
      "src/static-helpers/**/*.ts",
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
