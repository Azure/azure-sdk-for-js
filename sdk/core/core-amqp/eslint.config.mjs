export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-duplicate-enum-values": "warn",
    },
  },
];
