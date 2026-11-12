import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["package.json"],
    rules: {
      // OpenTelemetry SDK 3.x requires Node.js 22.15.0 or later.
      "@azure/azure-sdk/ts-package-json-engine-is-present": [
        "error",
        { nodeVersionOverride: ">=22.15.0" },
      ],
    },
  },
]);
