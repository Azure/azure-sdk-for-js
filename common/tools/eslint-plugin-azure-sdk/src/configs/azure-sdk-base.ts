// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export default {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    extraFileExtensions: [".json"],
  },
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-n",
    "no-only-tests",
    "promise",
    "eslint-plugin-tsdoc",
    "import",
    "markdown",
  ],
  env: {
    mocha: true,
    es2017: true,
  },
  ignorePatterns: ["**/generated/**"],
  overrides: [
    {
      files: ["*.ts", "*.cts", "*.mts", "*.tsx", "*.json"],
      excludedFiles: ["**/*.md/*.ts", "**/*.md/*.json", "**/src/**/*.json", "**/test/**/*.json"],
      parserOptions: {
        project: [
          "./tsconfig.json",
          "../../../common/tools/eslint-plugin-azure-sdk/tsconfig.lintjson.json",
        ],
      },
      extends: [
        "eslint:recommended",
        "plugin:promise/recommended",
        "plugin:n/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "prettier",
        "plugin:@azure/azure-sdk/recommended-legacy",
      ],
      rules: {
        curly: ["error", "multi-line"],
        "eol-last": ["error", "always"],
        eqeqeq: ["error", "always", { null: "ignore" }],
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: ["test/**/*.ts", "samples/**", "**/karma.conf.js", "**/.eslintrc.js"],
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
        "no-console": "off",
        "no-dupe-class-members": "off",
        "no-invalid-this": "off",
        "no-empty": "error",
        "no-fallthrough": "error",
        "@typescript-eslint/no-invalid-this": "off",
        "@typescript-eslint/no-require-imports": "error",
        "no-restricted-imports": ["error", { paths: ["rhea", "rhea/.*"] }],
        "no-return-await": "error",
        "no-undef": "off",
        "no-unsafe-finally": "error",
        "no-unused-vars": "off",
        "no-unused-expressions": "error",
        "no-useless-constructor": "off",
        "no-use-before-define": "off",
        "n/exports-style": ["error", "module.exports"],
        "n/no-missing-import": "off",
        "n/no-missing-require": "off",
        "n/hashbang": "warn",
        "n/no-unsupported-features/node-builtins": "warn",
        "n/no-deprecated-api": "warn",
        "n/no-process-exit": "warn",
        "n/no-unpublished-import": "off",
        "n/no-unpublished-require": "off",
        "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
        "no-var": "error",
        "one-var-declaration-per-line": "error",
        "prefer-const": "error",
        "sort-imports": "off",
        "spaced-comment": ["error", "always", { markers: ["/"] }],
        "space-infix-ops": ["error", { int32Hint: false }],
        "use-isnan": "error",
        "no-only-tests/no-only-tests": "error",
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error", { builtinGlobals: true }],
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/naming-convention": [
          "error",
          { selector: "default", format: null },
          { selector: ["class", "interface"], format: ["PascalCase"] },
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: {
              regex: "^I[A-Z]",
              match: false,
            },
          },
        ],
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "@typescript-eslint/no-array-constructor": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        // We use empty extends and empty interface for shimming and renaming extensively
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: true }],
        // https://github.com/Azure/azure-sdk-for-js/issues/7608
        // "@typescript-eslint/member-ordering": [
        //   "error",
        //   {
        //     default: [
        //       "instance-method",
        //       "method",
        //       "private-instance-method",
        //       "private-method",
        //       "private-static-method",
        //       "protected-instance-method",
        //       "protected-method",
        //       "protected-static-method",
        //       "public-instance-method",
        //       "public-method",
        //       "public-static-method",
        //       "static-method"
        //     ]
        //   }
        // ],
        // https://github.com/Azure/azure-sdk-for-js/issues/7605
        "@azure/azure-sdk/ts-apisurface-supportcancellation": "off",
        // https://github.com/Azure/azure-sdk-for-js/issues/7609
        "@azure/azure-sdk/ts-pagination-list": "off",
        // https://github.com/Azure/azure-sdk-for-js/issues/7610
        "@azure/azure-sdk/ts-doc-internal": "off",
        "tsdoc/syntax": "error",
      },
    },
    {
      files: ["**/*.md"],
      processor: "markdown/markdown",
    },
    {
      files: ["*.md/*.js"],
      extends: ["plugin:markdown/recommended-legacy"],
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["*"],
                message: "Please use require instead of import.",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["*md/*.ts"],
      parserOptions: {
        project: null,
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
