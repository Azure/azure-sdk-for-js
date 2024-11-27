import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
  {
    // shebang needs to come first
    files: ["src/bin/execute.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
];
