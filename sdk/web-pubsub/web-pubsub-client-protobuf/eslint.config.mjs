import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  { ignores: ["src/generated/*.**"] },
  ...azsdkEslint.configs.recommended,
];
