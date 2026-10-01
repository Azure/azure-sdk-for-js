import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommendedTypeChecked,
  {
    ignores: ["test/esm-app/**"],
  },
  {
    // Grandfathered (approved advanced case). monitor-opentelemetry legitimately uses
    // createRequire() to optionally load platform integrations (e.g. `@azure/functions-core`)
    // and to bridge ESM/CJS `require`. Scoped to these files so new dynamic loads elsewhere
    // in the package are still caught.
    files: ["**/src/shared/module.ts", "**/src/utils/azureSdkTracingBridge.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "no-underscore-dangle": [
        "error",
        {
          "allowAfterThis": true
        }
      ],
      "n/no-unsupported-features/es-syntax": [
        "error",
        {
          "ignores": ["modules"]
        }
      ]
    },
  },
];
