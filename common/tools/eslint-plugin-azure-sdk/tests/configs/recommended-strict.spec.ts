// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { ESLint, type Linter } from "eslint";
import { recommendedStrictDelta } from "../../src/configs/recommended-strict.js";
import plugin from "../../src/index.js";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const COGNITIVE_COMPLEXITY_THRESHOLD = 15;
const MAX_CLASSES_PER_FILE = 1;

/**
 * Flattens all `rules` objects from a config array into a single record.
 */
function flattenRules(configs: FlatConfig.ConfigArray): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const config of configs) {
    if (config && typeof config === "object" && "rules" in config && config.rules) {
      Object.assign(result, config.rules);
    }
  }
  return result;
}

describe("recommendedStrictDelta", () => {
  describe("typeChecked: false", () => {
    const deltaConfigs = recommendedStrictDelta({ typeChecked: false });
    const rules = flattenRules(deltaConfigs);

    it("should return a non-empty config array", () => {
      expect(Array.isArray(deltaConfigs)).toBe(true);
      expect(deltaConfigs.length).toBeGreaterThan(0);
    });

    it("should include sonarjs/cognitive-complexity set to ['error', 15]", () => {
      expect(rules["sonarjs/cognitive-complexity"]).toEqual([
        "error",
        COGNITIVE_COMPLEXITY_THRESHOLD,
      ]);
    });

    it("should include max-lines-per-function with documented options", () => {
      expect(rules["max-lines-per-function"]).toEqual([
        "error",
        { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
      ]);
    });

    it("should include max-classes-per-file set to ['error', 1]", () => {
      expect(rules["max-classes-per-file"]).toEqual(["error", MAX_CLASSES_PER_FILE]);
    });

    it("should include @typescript-eslint/max-params with max: 7", () => {
      expect(rules["@typescript-eslint/max-params"]).toEqual([
        "error",
        { max: 7, countVoidThis: false },
      ]);
    });

    it("should disable core max-params in favour of TS extension", () => {
      expect(rules["max-params"]).toBe("off");
    });

    it("should include no-nested-ternary as error", () => {
      expect(rules["no-nested-ternary"]).toBe("error");
    });

    it("should include no-param-reassign as warn with props: true", () => {
      expect(rules["no-param-reassign"]).toEqual(["warn", { props: true }]);
    });

    it("should include curly: all, overriding the recommended multi-line setting", () => {
      expect(rules["curly"]).toEqual(["error", "all"]);
    });

    it("should include @typescript-eslint/consistent-type-imports promoted to error", () => {
      expect(rules["@typescript-eslint/consistent-type-imports"]).toBe("error");
    });

    it("should reject duplicate imports while allowing separate type imports", () => {
      expect(rules["no-duplicate-imports"]).toEqual(["error", { allowSeparateTypeImports: true }]);
    });

    it("should silence high-noise sonarjs rules", () => {
      expect(rules["sonarjs/no-duplicate-string"]).toBe("off");
      expect(rules["sonarjs/no-commented-code"]).toBe("off");
      expect(rules["sonarjs/todo-tag"]).toBe("off");
      expect(rules["sonarjs/assertions-in-tests"]).toBe("off");
    });

    it("should keep sonarjs/no-hardcoded-ip as warn", () => {
      expect(rules["sonarjs/no-hardcoded-ip"]).toBe("warn");
    });

    it("should NOT contain type-checked-only rules", () => {
      expect(rules["@typescript-eslint/no-unnecessary-condition"]).toBeUndefined();
      expect(rules["@typescript-eslint/switch-exhaustiveness-check"]).toBeUndefined();
      expect(rules["@typescript-eslint/only-throw-error"]).toBeUndefined();
      expect(rules["@typescript-eslint/return-await"]).toBeUndefined();
      expect(rules["@typescript-eslint/no-deprecated"]).toBeUndefined();
      expect(rules["@typescript-eslint/prefer-readonly"]).toBeUndefined();
      expect(rules["@typescript-eslint/consistent-return"]).toBeUndefined();
    });

    it("should scope every emitted config object to JS/TS(X) files under src/ only", () => {
      // The strict delta is intentionally limited to shipped library code
      // under `src/`. If any entry were emitted without this scoping, the
      // strict rules would also fire for `test/`, `samples/`, etc.
      expect(deltaConfigs.length).toBeGreaterThan(0);
      for (const config of deltaConfigs) {
        expect(config.files).toEqual(["**/src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"]);
        expect(config.ignores).toContain("**/{test,tests,samples,samples-dev,perf,stress}/**");
      }
    });
  });

  describe("typeChecked: true", () => {
    const deltaConfigs = recommendedStrictDelta({ typeChecked: true });
    const rules = flattenRules(deltaConfigs);

    it("should return a non-empty config array", () => {
      expect(Array.isArray(deltaConfigs)).toBe(true);
      expect(deltaConfigs.length).toBeGreaterThan(0);
    });

    it("should include all always-on rules", () => {
      expect(rules["sonarjs/cognitive-complexity"]).toEqual([
        "error",
        COGNITIVE_COMPLEXITY_THRESHOLD,
      ]);
      expect(rules["max-lines-per-function"]).toEqual([
        "error",
        { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
      ]);
    });

    it("should include @typescript-eslint/no-deprecated as error", () => {
      expect(rules["@typescript-eslint/no-deprecated"]).toBe("error");
    });

    it("should include @typescript-eslint/no-unnecessary-condition as error", () => {
      expect(rules["@typescript-eslint/no-unnecessary-condition"]).toBe("error");
    });

    it("should include @typescript-eslint/switch-exhaustiveness-check as error", () => {
      expect(rules["@typescript-eslint/switch-exhaustiveness-check"]).toBe("error");
    });

    it("should include @typescript-eslint/only-throw-error as error", () => {
      expect(rules["@typescript-eslint/only-throw-error"]).toBe("error");
    });

    it("should include @typescript-eslint/return-await as ['error', 'in-try-catch']", () => {
      expect(rules["@typescript-eslint/return-await"]).toEqual(["error", "in-try-catch"]);
    });

    it("should disable core no-return-await in favour of @typescript-eslint/return-await", () => {
      // The base `recommended` preset enables `no-return-await: "error"`,
      // which contradicts `@typescript-eslint/return-await: ["error", "in-try-catch"]`
      // inside try/catch blocks. The strict type-checked delta must turn off
      // the core rule to keep the preset internally consistent.
      expect(rules["no-return-await"]).toBe("off");
    });

    it("should include @typescript-eslint/prefer-readonly as error", () => {
      expect(rules["@typescript-eslint/prefer-readonly"]).toBe("error");
    });

    it("should include @typescript-eslint/consistent-return as error", () => {
      expect(rules["@typescript-eslint/consistent-return"]).toBe("error");
    });

    it("should include @typescript-eslint/no-unnecessary-type-arguments as error", () => {
      expect(rules["@typescript-eslint/no-unnecessary-type-arguments"]).toBe("error");
    });

    it("should include @typescript-eslint/no-unnecessary-template-expression as error", () => {
      expect(rules["@typescript-eslint/no-unnecessary-template-expression"]).toBe("error");
    });

    it("should include @typescript-eslint/prefer-promise-reject-errors as error", () => {
      expect(rules["@typescript-eslint/prefer-promise-reject-errors"]).toBe("error");
    });

    it("should include @typescript-eslint/use-unknown-in-catch-callback-variable as error", () => {
      expect(rules["@typescript-eslint/use-unknown-in-catch-callback-variable"]).toBe("error");
    });

    it("should scope the always-on config objects to JS/TS(X) files under src/, and the type-checked ones to TS(X) only", () => {
      // Same scoping invariant as the non-type-checked variant, plus: type-aware
      // rules must not be enabled for `.js`/`.jsx`, which never get parser
      // services (only TS extensions set `projectService`).
      expect(deltaConfigs.length).toBeGreaterThan(0);
      const alwaysOnScope = ["**/src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"];
      const typedScope = ["**/src/**/*.{ts,cts,mts,tsx}"];

      for (const config of deltaConfigs) {
        expect([alwaysOnScope, typedScope]).toContainEqual(config.files);
        expect(config.ignores).toContain("**/{test,tests,samples,samples-dev,perf,stress}/**");
      }

      // Every config object carrying a type-aware rule must use the TS-only scope.
      const typedRuleNames = [
        "@typescript-eslint/no-unnecessary-condition",
        "@typescript-eslint/switch-exhaustiveness-check",
        "@typescript-eslint/only-throw-error",
        "@typescript-eslint/return-await",
        "@typescript-eslint/no-deprecated",
        "@typescript-eslint/prefer-readonly",
        "@typescript-eslint/consistent-return",
      ];
      for (const config of deltaConfigs) {
        const carriesTypedRule = typedRuleNames.some(
          (name) => config.rules && name in config.rules,
        );
        if (carriesTypedRule) {
          expect(config.files).toEqual(typedScope);
        }
      }

      // ...and at least one config object actually did carry them.
      expect(deltaConfigs.some((config) => config.files?.[0] === typedScope[0])).toBe(true);
    });
  });
});

describe("plugin exports", () => {
  const configs = plugin.configs;

  it("should expose recommendedStrict config", () => {
    expect(configs.recommendedStrict).toBeDefined();
    expect(Array.isArray(configs.recommendedStrict)).toBe(true);
    expect(configs.recommendedStrict.length).toBeGreaterThan(0);
  });

  it("should expose recommendedStrictTypeChecked config", () => {
    expect(configs.recommendedStrictTypeChecked).toBeDefined();
    expect(Array.isArray(configs.recommendedStrictTypeChecked)).toBe(true);
    expect(configs.recommendedStrictTypeChecked.length).toBeGreaterThan(0);
  });

  it("recommendedStrict should be longer than recommended (has additional rules)", () => {
    expect(configs.recommendedStrict.length).toBeGreaterThan(configs.recommended.length);
  });

  it("should not modify the original recommended config (sentinel rules match expected values)", () => {
    const recommendedRules = flattenRules(configs.recommended);
    // Sentinel rules that must be present in recommended
    expect(recommendedRules["no-var"]).toBe("error");
    expect(recommendedRules["prefer-const"]).toBe("error");
    expect(recommendedRules["no-param-reassign"]).toEqual(["warn", { props: false }]);
    // Sentinel: curly should still be multi-line in recommended (NOT all)
    expect(recommendedRules["curly"]).toEqual(["error", "multi-line"]);
  });

  it("configStrict should compose the strict preset, caller configs, and global ignores", () => {
    const customConfig = { name: "caller-config", rules: { "no-alert": "error" as const } };
    const result = plugin.configStrict([customConfig]);

    expect(result).toEqual([
      ...configs.recommendedStrict,
      customConfig,
      expect.objectContaining({
        ignores: ["**/test/snippets.spec.ts", "**/test/stress"],
      }),
    ]);
  });
});

describe("recommendedStrict import handling (ESLint integration)", () => {
  async function duplicateImportMessages(source: string): Promise<Linter.LintMessage[]> {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: plugin.configs.recommendedStrict as never,
    });
    const [result] = await eslint.lintText(source, { filePath: "src/index.ts" });
    return result.messages.filter((message) => message.ruleId === "no-duplicate-imports");
  }

  it("should report duplicate value imports", async () => {
    const messages = await duplicateImportMessages(`
      import { first } from "example";
      import { second } from "example";
      export { first, second };
    `);

    expect(messages).toEqual([
      expect.objectContaining({
        ruleId: "no-duplicate-imports",
      }),
    ]);
  });

  it("should allow separate value and type imports", async () => {
    const messages = await duplicateImportMessages(`
      import { value } from "example";
      import type { Value } from "example";
      export const result: Value = value;
    `);

    expect(messages).toEqual([]);
  });
});

describe("recommendedStrictTypeChecked resolved scope (ESLint integration)", () => {
  // Rules that require parser services. `prefer-readonly` etc. come from our
  // strict delta; `await-thenable` / `no-floating-promises` are inherited from
  // typescript-eslint's `recommendedTypeChecked` preset, which is not
  // extension-scoped on its own.
  const typedRules = [
    "@typescript-eslint/prefer-readonly",
    "@typescript-eslint/switch-exhaustiveness-check",
    "@typescript-eslint/no-deprecated",
    "@typescript-eslint/await-thenable",
    "@typescript-eslint/no-floating-promises",
  ];

  /** Rules from the strict delta that do NOT need type information. */
  const alwaysOnRules = ["max-classes-per-file", "sonarjs/cognitive-complexity"];

  async function resolveConfigFor(filePath: string): Promise<Linter.Config> {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: plugin.configs.recommendedStrictTypeChecked as never,
    });
    return (await eslint.calculateConfigForFile(filePath)) as Linter.Config;
  }

  /** Returns the subset of `names` that resolve to an enabled (non-"off") rule. */
  function enabledOf(config: Linter.Config, names: string[]): string[] {
    return names.filter((name) => {
      const entry = config.rules?.[name];
      if (entry === undefined) {
        return false;
      }
      const severity = Array.isArray(entry) ? entry[0] : entry;
      return severity !== "off" && severity !== 0;
    });
  }

  it.each(["src/example.js", "src/example.cjs", "src/example.mjs", "src/example.jsx"])(
    "should NOT enable any type-aware rule for %s (no parser services are configured for JavaScript)",
    async (filePath) => {
      const config = await resolveConfigFor(filePath);
      expect(enabledOf(config, typedRules)).toEqual([]);
    },
  );

  it.each(["src/example.ts", "src/example.cts", "src/example.mts", "src/example.tsx"])(
    "should enable type-aware rules for %s",
    async (filePath) => {
      const config = await resolveConfigFor(filePath);
      expect(enabledOf(config, typedRules)).toEqual(typedRules);
    },
  );

  it.each(["src/example.js", "src/example.jsx", "src/example.ts", "src/example.tsx"])(
    "should still apply the non-type-aware strict rules to %s",
    async (filePath) => {
      const config = await resolveConfigFor(filePath);
      expect(enabledOf(config, alwaysOnRules)).toEqual(alwaysOnRules);
    },
  );

  it("should not apply the strict delta outside src/", async () => {
    const config = await resolveConfigFor("test/example.ts");
    expect(enabledOf(config, alwaysOnRules)).toEqual([]);
  });

  it.each([
    "test/stress/app/src/example.ts",
    "tests/unit/src/example.ts",
    "samples/demo/src/example.ts",
    "samples-dev/demo/src/example.ts",
    "perf/benchmark/src/example.ts",
    "stress/app/src/example.ts",
  ])("should not apply the strict delta to excluded nested source tree %s", async (filePath) => {
    const config = await resolveConfigFor(filePath);
    expect(enabledOf(config, alwaysOnRules)).toEqual([]);
  });
});
