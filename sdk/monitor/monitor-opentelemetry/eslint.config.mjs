import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.configs.recommended,
  {
    rules: {
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
    },
    settings: {
      node: {
        tryExtensions: [".ts"]
      }
    },
  },
];
