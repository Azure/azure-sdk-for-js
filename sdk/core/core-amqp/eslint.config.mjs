import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/util/hmacSha256.common.ts"],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
]);
