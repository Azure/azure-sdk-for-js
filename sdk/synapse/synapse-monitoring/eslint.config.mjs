import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "@azure/azure-sdk/github-source-headers": "off",
      "@azure/azure-sdk/ts-use-interface-parameters": "off",
    },
  },
];
