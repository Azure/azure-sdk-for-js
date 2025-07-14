import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    // shebang needs to come first
    files: ["src/index.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
]);