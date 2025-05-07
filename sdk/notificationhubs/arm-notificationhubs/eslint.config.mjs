import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/**/*.ts", "samples-dev/**/*.ts", "test/**/*.ts"],
    rules: {
      "@azure/azure-sdk/github-source-headers": "off",
      "@typescript-eslint/no-use-before-define": "warn",
      eqeqeq: "warn",
      "prefer-const": "warn",
      "tsdoc/syntax": "off",
    },
  },
]);
