import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  // React Native test files require a dedicated tsconfig project that will be
  // added in a follow-up migration PR. Until then, exclude them from linting.
  { ignores: ["test/**/react-native/**"] },
  ...azsdkEslint.config([
    {
      rules: {
        "@azure/azure-sdk/ts-package-json-name": "warn",
        "@azure/azure-sdk/ts-versioning-semver": "warn",
        "n/no-unsupported-features/node-builtins": "off",
      },
    },
  ]),
];
