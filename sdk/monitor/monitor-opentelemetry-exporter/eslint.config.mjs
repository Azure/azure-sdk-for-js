import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  { ignores: ["src/Declarations"] },
  ...azsdkEslint.configs.recommendedTypeChecked,
  {
    "rules": {
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "no-underscore-dangle": [
        "error",
        {
          "allowAfterThis": true
        }
      ],
      "n/no-unsupported-features/es-syntax": [
        "error",
        {
          "ignores": ["modules"]
        }
      ]
    }
  },
];
