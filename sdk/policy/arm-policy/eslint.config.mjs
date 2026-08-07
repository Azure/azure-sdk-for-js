import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.config([
    {
      rules: {
        "@azure/azure-sdk/ts-modules-only-named": "warn",
        "@azure/azure-sdk/ts-package-json-types": "warn",
        "@azure/azure-sdk/ts-package-json-engine-is-present": "warn",
        "@azure/azure-sdk/ts-package-json-files-required": "off",
        "@azure/azure-sdk/ts-package-json-main-is-cjs": "off",
        // Keep type-only export enforcement as an error: it prevents the
        // Node ESM import break where interfaces are re-exported as runtime values.
        "@azure/azure-sdk/ts-consistent-type-exports": "error",
        // Generated reference docs contain characters TSDoc dislikes; not fixable in generated output.
        "tsdoc/syntax": "off",
        // The following originate from generator-emitted static-helper templates
        // (src/static-helpers/**) and are downgraded until fixed in the generator.
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/no-shadow": "warn",
        "no-useless-escape": "warn",
      },
    },
  ]),
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
];
