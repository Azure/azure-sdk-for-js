import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    files: [
      "src/fetchHttpClient.ts",
      "src/interfaces.ts",
      "src/policies/formDataPolicy.ts",
      "src/policies/multipartPolicy.ts",
      "src/util/concat.ts",
      "src/util/concat.common.ts",
      "src/util/file.ts",
      "src/util/typeGuards.ts",
      "test/formDataPolicy.spec.ts",
      "test/multipartPolicy.spec.ts",
    ],
    rules: {
      "n/no-unsupported-features/node-builtins": "off",
    },
  },
]);
