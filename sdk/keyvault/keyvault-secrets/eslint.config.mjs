import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/api/**/*.ts", "src/classic/**/*.ts", "src/models/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": "off",
      "tsdoc/syntax": "off",
    },
  },
]);
