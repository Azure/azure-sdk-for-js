import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: ["src/models.ts", "src/sse.ts", "src/utils.ts"],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
]);
