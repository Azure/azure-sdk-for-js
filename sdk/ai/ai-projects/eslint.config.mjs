import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-modules-only-named": "warn",
    },
  },
  {
    // TEMPORARY grandfather (pending fix). These tracing files load `@opentelemetry/api`
    // via createRequire()/aliased `require` instead of routing spans through
    // `@azure/core-tracing`. The ai-projects team is aware and will migrate tracing to
    // `@azure/core-tracing` before this PR lands; remove this override once that is done.
    files: ["**/src/tracing/tracingClient.ts", "**/src/tracing/metrics.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);
