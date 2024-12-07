import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-package-json-module": "off",
      "@azure/azure-sdk/ts-package-json-types": "off",
      "@azure/azure-sdk/ts-package-json-files-required": "off",
    },
  },
  {
    // shebang needs to come first
    files: ["src/index.ts", "src/utils.ts", "src/initialize.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
]);
