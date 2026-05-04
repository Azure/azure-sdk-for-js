// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "eslint/config";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import sonarjs from "eslint-plugin-sonarjs";

// Type assertion helper to work around type incompatibilities between
// typescript-eslint's FlatConfig types and ESLint core's defineConfig types
// See: https://github.com/typescript-eslint/typescript-eslint/issues/10899
function bypassTypeCheck<T>(config: T) {
  return config as never;
}

const COGNITIVE_COMPLEXITY_THRESHOLD = 15;
const MAX_LINES_PER_FUNCTION = 100;
const MAX_CLASSES_PER_FILE = 1;
const MAX_PARAMS = 7;

/**
 * Returns the strict-only delta config array — the additional rules that go
 * beyond the `recommended` / `recommendedTypeChecked` preset.
 *
 * @param options.typeChecked - When `true`, type-checked-only rules are included.
 *   When `false`, rules that require parser services are omitted.
 */
export function recommendedStrictDelta(options: { typeChecked: boolean }): FlatConfig.ConfigArray {
  const { typeChecked } = options;

  // sonarjs/recommended is a single flat-config object (not an array).
  // We include it always (sonarjs rules don't require type info), then layer
  // overrides on top so our thresholds win.
  const sonarjsBase = defineConfig(bypassTypeCheck(sonarjs.configs.recommended), {
    // Override / silence high-noise sonarjs rules so the preset is
    // realistic to adopt incrementally.
    rules: {
      // TODO: enable per-package after audit
      "sonarjs/no-duplicate-string": "off",
      // too noisy in code that intentionally documents alternatives
      "sonarjs/no-commented-code": "off",
      // we use TODO/FIXME comments as workflow markers
      "sonarjs/todo-tag": "off",
      // keep as warn (security-relevant but noisy) — do NOT disable
      "sonarjs/no-hardcoded-ip": "warn",
      // override sonarjs default with our tighter threshold
      "sonarjs/cognitive-complexity": ["error", COGNITIVE_COMPLEXITY_THRESHOLD],
    },
  });

  // Rules that are always on (no type info required)
  const alwaysOnRules = defineConfig({
    rules: {
      // --- Structural caps ---
      "max-lines-per-function": [
        "error",
        { max: MAX_LINES_PER_FUNCTION, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      "max-classes-per-file": ["error", MAX_CLASSES_PER_FILE],
      // Disable core in favour of TS extension below
      "max-params": "off",
      "@typescript-eslint/max-params": ["error", { max: MAX_PARAMS, countVoidThis: false }],

      // --- Anti "clever one-liner" ---
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-implicit-coercion": "error",
      "no-lonely-if": "error",
      "no-else-return": ["error", { allowElseIf: false }],

      // --- Mutation / scoping ---
      // Overrides eslint-customized.ts which sets this to ["warn", { props: false }]
      "no-param-reassign": ["error", { props: true }],
      // Already error in customized; keep consistent
      "@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: true }],

      // --- Switch / control flow ---
      // Overrides eslint-customized.ts which sets this to ["error", "multi-line"]
      curly: ["error", "all"],
      "default-case": "error",
      "default-case-last": "error",

      // --- Imports ---
      "no-duplicate-imports": "error",
      // Promotes from warn (in customized) to error
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",

      // --- Errors thrown / caught ---
      "no-empty": ["error", { allowEmptyCatch: false }],

      // --- Dead / redundant code (non-type-checked variants) ---
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-useless-concat": "error",

      // --- Async safety (non-type-checked variants) ---
      // TODO: promote to error after audit across SDK packages
      "no-await-in-loop": "warn",
      "no-promise-executor-return": "error",
      "require-atomic-updates": "error",
    },
  });

  if (!typeChecked) {
    return [...sonarjsBase, ...alwaysOnRules];
  }

  // Additional rules that require parser services (type info)
  const typeCheckedRules = defineConfig({
    rules: {
      // --- Mutation / scoping (type-checked) ---
      "@typescript-eslint/prefer-readonly": "error",

      // --- Switch / control flow (type-checked) ---
      // Disable core in favour of TS extension
      "consistent-return": "off",
      "@typescript-eslint/consistent-return": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      // --- Imports (type-checked) ---
      "@typescript-eslint/no-deprecated": "error",

      // --- Errors thrown / caught (type-checked) ---
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
      "@typescript-eslint/prefer-promise-reject-errors": "error",

      // --- Async safety (type-checked) ---
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      // --- Dead / redundant code (type-checked) ---
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unnecessary-template-expression": "error",
    },
  });

  return [...sonarjsBase, ...alwaysOnRules, ...typeCheckedRules];
}
