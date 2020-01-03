// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export default {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    createDefaultProgram: true
  },
  plugins: ["@typescript-eslint", "no-only-tests", "promise"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  env: {
    mocha: true
  },
  rules: {
    curly: ["error", "multi-line"],
    "eol-last": ["error", "always"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-console": "off",
    "no-dupe-class-members": "off",
    "no-empty": "error",
    "no-fallthrough": "error",
    "no-invalid-this": "error",
    "no-redeclare": ["error", { builtinGlobals: true }],
    "no-restricted-imports": ["error", { paths: ["rhea", "rhea/.*"] }],
    "no-return-await": "error",
    "no-undef": "off",
    "no-unsafe-finally": "error",
    "no-unused-vars": "off",
    "no-unused-expressions": "error",
    "no-useless-constructor": "off",
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "no-var": "error",
    "one-var-declaration-per-line": "error",
    "prefer-const": "error",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "space-infix-ops": ["error", { int32Hint: false }],
    "use-isnan": "error",
    "no-only-tests/no-only-tests": "error",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "@typescript-eslint/no-array-constructor": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ],
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/interface-name-prefix": ["error", "never"],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "instance-method",
          "method",
          "private-instance-method",
          "private-method",
          "private-static-method",
          "protected-instance-method",
          "protected-method",
          "protected-static-method",
          "public-instance-method",
          "public-method",
          "public-static-method",
          "static-method"
        ]
      }
    ],
    "@azure/azure-sdk/ts-config-lib": "warn"
  }
};
