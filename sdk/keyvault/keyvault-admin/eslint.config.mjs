import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@azure/azure-sdk/ts-naming-options": "warn",
    },
  },
  {
    files: ["src/api/**/*.ts", "src/classic/**/*.ts", "src/models/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "tsdoc/syntax": "off",
    },
  },
]);
