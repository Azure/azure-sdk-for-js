// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SharedConfig } from "@typescript-eslint/utils/ts-eslint";

const rules: Record<string, SharedConfig.RuleEntry> = {
  curly: ["error", "multi-line"],
  "eol-last": ["error", "always"],
  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-console": "off",
  "no-dupe-class-members": "off",
  "no-invalid-this": "off",
  "no-empty": "error",
  "no-fallthrough": "error",
  "no-restricted-imports": ["error", { paths: ["rhea", "rhea/.*"] }],
  "no-return-await": "error",
  "no-undef": "off",
  "no-unsafe-finally": "error",
  "no-unused-vars": "off",
  "no-unused-expressions": "error",
  "no-useless-constructor": "off",
  "no-use-before-define": "off",
  "no-var": "error",
  "one-var-declaration-per-line": "error",
  "prefer-const": "error",
  "sort-imports": "off",
  "spaced-comment": ["error", "always", { markers: ["/"] }],
  "space-infix-ops": ["error", { int32Hint: false }],
  "use-isnan": "error",
  "no-redeclare": "off",
  "no-shadow": "off",
  "no-param-reassign": ["warn", { props: false }],
  // ESLint v10 flipped this rule's `reportGlobalThis` option default from
  // false -> true, so it now flags `declare const globalThis` ambient
  // TypeScript declarations (used to narrowly type `globalThis.*` without
  // pulling in full lib types) as shadowing a restricted name. Restore the
  // v9 behavior for globalThis while keeping the rest of the rule active.
  "no-shadow-restricted-names": ["error", { reportGlobalThis: false }],
};

export default {
  name: "eslint-azsdk-customized",
  rules,
};
