import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  { ignores: ["src/ws.browser.js"] },
  {
    rules: {
      "no-return-await": "off",
      "no-empty": "off",
      "no-constant-condition": "off",
    },
  },
]);
