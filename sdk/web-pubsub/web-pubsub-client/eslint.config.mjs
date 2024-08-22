import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  { ignores: ["src/ws.browser.js"] },
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "no-return-await": "off",
      "no-empty": "off",
      "no-constant-condition": "off",
    },
  },
];
