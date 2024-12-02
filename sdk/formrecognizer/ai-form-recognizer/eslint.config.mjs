import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    // shebang needs to come first
    files: ["src/bin/gen-model.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
];
