import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
    rules: {
      "@azure/azure-sdk/ts-package-json-files-required": "off",
    },
  },
  {
    // Grandfathered (approved advanced case). Reads this package's own version via
    // createRequire(import.meta.url) to resolve its package.json. Scoped to this file so
    // new dynamic loads elsewhere in the package are still caught.
    files: ["**/src/utils/getPackageVersion.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);
