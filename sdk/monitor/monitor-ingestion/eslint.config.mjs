import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommendedTypeChecked,
  {
    files: ["samples-dev/**/*.ts"],
    rules: {
      "n/no-process-exit": "off",
    },
  },
];
