import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-modules-only-named": "warn",
      "@azure/azure-sdk/ts-package-json-types": "warn",
      "@azure/azure-sdk/ts-package-json-engine-is-present": "warn",
      "@azure/azure-sdk/ts-package-json-files-required": "off",
      "@azure/azure-sdk/ts-package-json-main-is-cjs": "off",
      "tsdoc/syntax": "warn",
    },
  },
  {
    // Sample spec files intentionally re-declare `client` and `certificateName`
    // inside self-contained README snippet `it` blocks that shadow the describe-scope
    // declarations set up in `beforeEach`. This is by design.
    files: ["test/public/samples/**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-shadow": [
        "error",
        {
          ignoreTypeValueShadow: true,
          allow: ["client", "certificateName", "secretClient", "issuerName"],
        },
      ],
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
