import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["package.json"],
    rules: {
      // inquirer 13.x requires Node.js >=20.12.0
      "@azure/azure-sdk/ts-package-json-engine-is-present": "off",
    },
  },
  {
    files: ["src/bin/execute.ts"],
    rules: {
      "n/no-process-exit": "off",
      "n/hashbang": "off",
      // shebang needs to come first
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
]);
