// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { fixupPluginRules } from "@eslint/compat";
import n from "eslint-plugin-n";
import noOnlyTests from "eslint-plugin-no-only-tests";
import tsdoc from "eslint-plugin-tsdoc";
import { rules as importRules } from "eslint-plugin-import";

const tsEslintCustomization: Record<string, SharedConfig.RuleEntry> = {
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

const azsdkDefault: Record<string, SharedConfig.RuleEntry> = {
  "@azure/azure-sdk/github-source-headers": "error",
  "@azure/azure-sdk/ts-apiextractor-json-types": "error",
  "@azure/azure-sdk/ts-apisurface-standardized-verbs": "error",
  "@azure/azure-sdk/ts-config-include": "error",
  "@azure/azure-sdk/ts-doc-internal-private-member": "warn",
  "@azure/azure-sdk/ts-error-handling": "off",
  "@azure/azure-sdk/ts-modules-only-named": "error",
  "@azure/azure-sdk/ts-naming-drop-noun": "error",
  "@azure/azure-sdk/ts-naming-options": "error",
  "@azure/azure-sdk/ts-naming-subclients": "error",
  "@azure/azure-sdk/ts-no-const-enums": "warn",
  "@azure/azure-sdk/ts-no-window": "error",
  "@azure/azure-sdk/ts-package-json-author": "error",
  "@azure/azure-sdk/ts-package-json-bugs": "error",
  "@azure/azure-sdk/ts-package-json-engine-is-present": "error",
  "@azure/azure-sdk/ts-package-json-files-required": "error",
  "@azure/azure-sdk/ts-package-json-keywords": "error",
  "@azure/azure-sdk/ts-package-json-license": "error",
  "@azure/azure-sdk/ts-package-json-main-is-cjs": "error",
  "@azure/azure-sdk/ts-package-json-module": "error",
  "@azure/azure-sdk/ts-package-json-name": "error",
  "@azure/azure-sdk/ts-package-json-repo": "error",
  "@azure/azure-sdk/ts-package-json-required-scripts": "error",
  "@azure/azure-sdk/ts-package-json-sdktype": "error",
  "@azure/azure-sdk/ts-package-json-sideeffects": "error",
  "@azure/azure-sdk/ts-package-json-types": "error",
  "@azure/azure-sdk/ts-use-interface-parameters": "warn",
  "@azure/azure-sdk/ts-use-promises": "error",
  "@azure/azure-sdk/ts-versioning-semver": "error",
  // https://github.com/Azure/azure-sdk-for-js/issues/7605
  "@azure/azure-sdk/ts-apisurface-supportcancellation": "off",
  // https://github.com/Azure/azure-sdk-for-js/issues/7609
  "@azure/azure-sdk/ts-pagination-list": "off",
  // https://github.com/Azure/azure-sdk-for-js/issues/7610
  "@azure/azure-sdk/ts-doc-internal": "off",
};

const nCustomization = {
  name: "n-azsdk-customized",
  rules: {
    "n/exports-style": ["error", "module.exports"],
    "n/no-missing-import": "off",
    "n/no-missing-require": "off",
    "n/hashbang": "warn",
    "n/no-unsupported-features/node-builtins": "warn",
    "n/no-deprecated-api": "warn",
    "n/no-process-exit": "warn",
    "n/no-unpublished-import": "off",
    "n/no-unpublished-require": "off",
  },
};

function turnoffN(): Record<string, SharedConfig.RuleEntry> {
  const rules: Record<string, SharedConfig.RuleEntry> = {};
  for (const rule of Object.keys(n.rules ?? {})) {
    rules[`n/${rule}`] = "off";
  }
  return rules;
}

const nOffForBrowser = {
  files: ["**/browser/**/*.{ts,cts,mts}", "**/*.browser.{ts,cts,mts}", "**/*-browser.{ts,cts,mts}"],
  rules: turnoffN(),
};

const noOnlyTestsCustomization = {
  name: "no-only-tests-azsdk-customized",
  plugins: {
    "no-only-tests": noOnlyTests,
  },
  files: ["**/test/**/*.ts"],
  rules: {
    "no-only-tests/no-only-tests": "error",
  },
};

const tsdocCustomization = {
  name: "tsdoc-azsdk-customized",
  plugins: {
    tsdoc: fixupPluginRules(tsdoc),
  },
  rules: {
    "tsdoc/syntax": "error",
  },
};

const importCustomization = {
  name: "import-azsdk-customized",
  plugins: {
    import: fixupPluginRules({ rules: importRules }),
  },
  rules: {
    "import/no-extraneous-dependencies": "error",
  },
};

const rules: Record<string, SharedConfig.RuleEntry> = {
  ...tsEslintCustomization,
  ...azsdkDefault,
};

export default (parser: FlatConfig.Parser): FlatConfig.ConfigArray => [
  {
    name: "@azure/azure-sdk/recommended-ts",
    files: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx"],
    ignores: ["**/*.md/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules,
    settings: {
      main: "src/index.ts",
    },
  },
  {
    name: "@azure/azure-sdk/recommended-json",
    files: ["*.json"],
    ignores: ["**/*.md/*.json", "**/src/**/*.json", "**/test/**/*.json"],
    languageOptions: {
      parser,
      parserOptions: {
        project: ["../../../common/tools/eslint-plugin-azure-sdk/tsconfig.lintjson.json"],
        extraFileExtensions: [".json"],
      },
    },
    rules: {
      ...rules,
      "no-unused-expressions": "off",
    },
    settings: {
      main: "src/index.ts",
    },
  },
  n.configs["flat/recommended"],
  nCustomization as unknown as FlatConfig.Config,
  nOffForBrowser,
  noOnlyTestsCustomization as FlatConfig.Config,
  tsdocCustomization as FlatConfig.Config,
  importCustomization as FlatConfig.Config,
];
