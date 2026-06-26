// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { type FixupPluginDefinition, fixupPluginRules } from "@eslint/compat";
import importX from "eslint-plugin-import-x";
import n from "eslint-plugin-n";
import noOnlyTests from "eslint-plugin-no-only-tests";
import tsdoc from "eslint-plugin-tsdoc";

const tsEslintCustomization: Record<string, SharedConfig.RuleEntry> = {
  "@typescript-eslint/no-invalid-this": "off",
  "@typescript-eslint/no-require-imports": "error",
  "@typescript-eslint/consistent-type-imports": "warn",
  "@typescript-eslint/consistent-type-exports": "off",
  "@azure/azure-sdk/ts-consistent-type-exports": [
    "error",
    { fixMixedExportsWithInlineTypeSpecifier: true },
  ],
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
  "@typescript-eslint/no-empty-object-type": "off",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-unused-vars": "off", // typescript compiler already checks this
  "@typescript-eslint/no-unused-expressions": "off",
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
  "@azure/azure-sdk/ts-apisurface-standardized-verbs": "error",
  "@azure/azure-sdk/ts-doc-internal-private-member": "warn",
  "@azure/azure-sdk/ts-error-handling": "off",
  "@azure/azure-sdk/ts-modules-only-named": "error",
  "@azure/azure-sdk/ts-naming-drop-noun": "error",
  "@azure/azure-sdk/ts-naming-options": "error",
  "@azure/azure-sdk/ts-naming-subclients": "error",
  "@azure/azure-sdk/ts-no-const-enums": "warn",
  "@azure/azure-sdk/ts-no-invalid-test-imports": "off",
  "@azure/azure-sdk/ts-no-window": "error",
  "@azure/azure-sdk/ts-package-json-approved-dependencies": "error",
  "@azure/azure-sdk/ts-package-json-author": "error",
  "@azure/azure-sdk/ts-package-json-bugs": "error",
  "@azure/azure-sdk/ts-package-json-engine-is-present": "error",
  "@azure/azure-sdk/ts-package-json-files-required": "error",
  "@azure/azure-sdk/ts-package-json-keywords": "error",
  "@azure/azure-sdk/ts-package-json-license": "error",
  "@azure/azure-sdk/ts-package-json-main-is-cjs": "error",
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
    tsdoc: fixupPluginRules(tsdoc as FixupPluginDefinition),
  },
  rules: {
    "tsdoc/syntax": "error",
  },
};

// Production source must not load modules through `createRequire()` or by aliasing
// the global `require`. Those patterns hide a dependency from the static module graph,
// so bundlers, api-extractor, and dependency linting can't see it — which lets a
// package acquire an undeclared (or dev-only) runtime dependency that silently fails
// for consumers.
const createRequireMessage =
  "Do not use createRequire() in production source: it loads modules outside the static " +
  "module graph, hiding the dependency from bundlers and dependency linting and allowing an " +
  "undeclared or dev-only package to be loaded at runtime. If this is an " +
  "approved advanced case, disable this rule on the line with a justification comment.";
const requireAliasMessage =
  "Do not alias the global `require` in production source: it dodges the import/dependency rules " +
  "the same way createRequire() does. Import the module statically and declare it as a runtime " +
  "dependency. If this is an approved advanced case, disable this rule on the line with a " +
  "justification comment.";

const noDynamicModuleLoad: FlatConfig.Config = {
  name: "azsdk/no-dynamic-module-load",
  files: ["**/src/**/*.ts", "**/src/**/*.cts", "**/src/**/*.mts"],
  rules: {
    "no-restricted-syntax": [
      "error",
      { selector: "CallExpression[callee.name='createRequire']", message: createRequireMessage },
      {
        selector: "CallExpression[callee.property.name='createRequire']",
        message: createRequireMessage,
      },
      { selector: "VariableDeclarator[init.name='require']", message: requireAliasMessage },
      { selector: "AssignmentExpression[right.name='require']", message: requireAliasMessage },
    ],
  },
};

// Production source must import only declared *runtime* dependencies. Importing a package
// that lives only in `devDependencies` resolves inside the monorepo and tests but is absent
// for consumers, so it fails (often silently) once published. `includeTypes` is left at its
// default (false): only runtime value imports are checked, since type-only imports
// (`import type`) are erased at runtime and pose no runtime risk. See documentation/linting.md.
// Scoped to `src/**` only, so tests and samples may freely import devDependencies.
const srcRuntimeDepsOnly: FlatConfig.Config = {
  name: "azsdk/src-runtime-deps-only",
  files: ["**/src/**/*.ts", "**/src/**/*.cts", "**/src/**/*.mts"],
  ignores: [
    // Platform-variant shims import platform-provided modules (e.g. `react-native`) that are
    // intentionally devDependencies — the consumer's bundler swaps them in, so they are not
    // on the Node runtime path. (Observed in the repo-wide scan: react-native shims in core
    // packages. Add browser/workerd patterns here only if/when they are observed as reds.)
    "**/*-react-native.{ts,cts,mts}",
    // Bin / codegen CLI scripts under src/bin are dev tooling, not shipped runtime code.
    "**/src/bin/**",
  ],
  plugins: {
    "import-x": importX as unknown as FixupPluginDefinition,
  },
  rules: {
    // `includeTypes: false` (default): only runtime value imports are checked. Type-only
    // imports (`import type`) are erased at runtime, so a dev-only type import is not a
    // runtime failure; flagging them added noise without runtime risk.
    "import-x/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: false,
        includeTypes: false,
      },
    ],
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
        projectService: true,
      },
    },
    rules,
    settings: {
      main: "src/index.ts",
    },
  },
  {
    name: "@azure/azure-sdk/recommended-json",
    files: ["*.json", "*/*/*.json"],
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
  {
    files: ["samples-dev/**/*.ts", "*/*/samples-dev/**/*.ts"],
    rules: {
      "tsdoc/syntax": "off",
      "n/no-process-exit": "off",
    },
  },
  {
    files: ["test/snippets.spec.ts", "**/*/test/snippets.spec.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/src/**/*.ts"],
    rules: {
      "@azure/azure-sdk/ts-use-cjs-polyfill": "error",
    },
  },
  noDynamicModuleLoad,
  srcRuntimeDepsOnly,
];
