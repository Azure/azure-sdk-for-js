// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import typescriptEslint from "typescript-eslint";
import { SharedConfig } from "@typescript-eslint/utils/ts-eslint";

const rules: Record<string, SharedConfig.RuleEntry> = {
  "@typescript-eslint/no-invalid-this": "off",
  "@typescript-eslint/no-require-imports": "error",
  "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: false }],
  "@typescript-eslint/explicit-module-boundary-types": ["error"],
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
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-inferrable-types": "off",
  // We use empty extends and empty interface for shimming and renaming extensively
  "@typescript-eslint/no-empty-interface": "off",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/no-useless-constructor": "error",
  "@typescript-eslint/no-var-requires": "off",
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
};

export default {
  files: ["*.ts", "*.cts", "*.mts", "*.tsx", "*.json"],
  excludedFiles: ["**/*.md/*.ts", "**/*.md/*.json", "**/src/**/*.json", "**/test/**/*.json"],
  plugins: {
    "@typescript-eslint": typescriptEslint.plugin,
  },
  languageOptions: {
    parser: typescriptEslint.parser,
    parserOptions: {
      project: [
        "./tsconfig.json",
        "../../../common/tools/eslint-plugin-azure-sdk/tsconfig.lintjson.json",
      ],
    },
  },
  rules,
};
