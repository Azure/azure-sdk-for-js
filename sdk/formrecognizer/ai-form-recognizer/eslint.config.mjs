import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/bin/gen-model.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      "n/no-extraneous-import": "warn",
      // shebang needs to come first
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
]);
