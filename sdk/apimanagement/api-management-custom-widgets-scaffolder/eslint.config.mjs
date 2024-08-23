import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@azure/azure-sdk/github-source-headers": "off",
    },
  },
];
