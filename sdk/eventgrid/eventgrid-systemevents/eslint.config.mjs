import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/models/models.ts"],
    rules: {
      "tsdoc/syntax": "off",
      "@typescript-eslint/naming-convention": "warn",
    },
  },
]);
