// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { recommendedStrictDelta } from "../../src/configs/recommended-strict.js";
import plugin from "../../src/index.js";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

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
      expect(rules["sonarjs/cognitive-complexity"]).toEqual(["error", 15]);
    });

    it("should include max-lines-per-function with documented options", () => {
      expect(rules["max-lines-per-function"]).toEqual([
        "error",
        { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
      ]);
    });

    it("should include max-classes-per-file set to ['error', 1]", () => {
      expect(rules["max-classes-per-file"]).toEqual(["error", 1]);
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
  });

  describe("typeChecked: true", () => {
    const deltaConfigs = recommendedStrictDelta({ typeChecked: true });
    const rules = flattenRules(deltaConfigs);

    it("should return a non-empty config array", () => {
      expect(Array.isArray(deltaConfigs)).toBe(true);
      expect(deltaConfigs.length).toBeGreaterThan(0);
    });

    it("should include all always-on rules", () => {
      expect(rules["sonarjs/cognitive-complexity"]).toEqual(["error", 15]);
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

  it("configStrict helper should return an array", () => {
    const result = plugin.configStrict();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
