import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["**/package.json"],
    rules: {
      "@azure/azure-sdk/ts-package-json-engine-is-present": [
        "error",
        { nodeVersionOverride: "^22.23.4 || ^24.22.1 || >=26.12.1" },
      ],
    },
  },
]);
