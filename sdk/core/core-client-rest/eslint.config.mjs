import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: [
      "src/common.ts",
      "src/getClient.ts",
      "src/multipart.ts",
      "src/sendRequest.ts",
      "src/helpers/isBinaryBody.ts",
      "test/multipart.spec.ts",
      "test/sendRequest.spec.ts",
    ],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
]);
