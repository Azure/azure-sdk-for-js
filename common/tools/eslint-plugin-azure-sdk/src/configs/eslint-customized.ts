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
  // ESLint v10 turned these three rules on by default in eslint:recommended.
  // Downgrade them to "warn" so the v9 -> v10 upgrade does not break `lint`
  // across the entire repo at once. They stay visible (matching the
  // no-param-reassign precedent above) and can be promoted back to "error"
  // once existing violations are cleaned up repo-wide.
  "preserve-caught-error": "warn",
  "no-useless-assignment": "warn",
  "no-unassigned-vars": "warn",
};

export default {
  name: "eslint-azsdk-customized",
  rules,
};
