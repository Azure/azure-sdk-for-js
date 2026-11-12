// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, beforeEach, describe, it } from "vitest";
import { ConfigurationProfile } from "../../src/_configuration/configurationProfile.js";
import { evaluateFeature } from "../../src/_configuration/featureEvaluation.js";

describe("OneSettings feature evaluation", () => {
  const profile = ConfigurationProfile.getInstance();

  afterEach(() => {
    profile.reset();
  });

  describe("ConfigurationProfile", () => {
    it("fills every field on an empty profile", () => {
      profile.fill({
        os: "windows",
        rp: "fn",
        attach: "manual",
        version: "1.0.0",
        component: "ext",
        region: "westus",
        ikey: "12345678-1234-1234-1234-123456789abc",
      });

      assert.deepStrictEqual(profile.snapshot(), {
        os: "windows",
        rp: "fn",
        attach: "manual",
        version: "1.0.0",
        component: "ext",
        region: "westus",
        ikey: "12345678-1234-1234-1234-123456789abc",
      });
    });

    it("leaves omitted fields empty when filling partially", () => {
      profile.fill({ os: "linux", version: "2.0.0" });

      const snapshot = profile.snapshot();
      assert.strictEqual(snapshot.os, "linux");
      assert.strictEqual(snapshot.version, "2.0.0");
      assert.strictEqual(snapshot.rp, "");
      assert.strictEqual(snapshot.attach, "");
      assert.strictEqual(snapshot.component, "");
      assert.strictEqual(snapshot.region, "");
      assert.strictEqual(snapshot.ikey, "");
    });

    it("does not overwrite already-set fields but still sets new ones", () => {
      profile.fill({ os: "windows", version: "1.0.0" });
      profile.fill({ os: "linux", version: "2.0.0", rp: "fn" });

      const snapshot = profile.snapshot();
      assert.strictEqual(snapshot.os, "windows");
      assert.strictEqual(snapshot.version, "1.0.0");
      assert.strictEqual(snapshot.rp, "fn");
    });

    it("returns a snapshot that does not mutate internal state", () => {
      profile.fill({ os: "windows" });
      const snapshot = profile.snapshot();
      (snapshot as { os: string }).os = "linux";
      assert.strictEqual(profile.snapshot().os, "windows");
    });
  });

  describe("evaluateFeature", () => {
    function parseInteger(value: string): number {
      const parsed = Number(value);
      if (!Number.isInteger(parsed)) {
        throw new TypeError(`Expected an integer, received ${value}`);
      }
      return parsed;
    }

    it("returns the default state when there are no overrides", () => {
      assert.strictEqual(evaluateFeature("F", { F: { default: "enabled" } }), true);
      assert.strictEqual(evaluateFeature("F", { F: { default: "disabled" } }), false);
    });

    it("returns undefined for a missing or malformed default", () => {
      assert.strictEqual(evaluateFeature("F", { F: {} }), undefined);
      assert.strictEqual(evaluateFeature("F", { F: { default: true } }), undefined);
      assert.strictEqual(evaluateFeature("F", { F: { default: null } }), undefined);
    });

    it("is case-insensitive on the default value", () => {
      assert.strictEqual(evaluateFeature("F", { F: { default: "ENABLED" } }), true);
    });

    it("preserves arbitrary string defaults without a converter", () => {
      assert.strictEqual(evaluateFeature("INTERVAL", { INTERVAL: { default: "60" } }), "60");
    });

    it("converts arbitrary defaults to the requested type", () => {
      assert.strictEqual(
        evaluateFeature("INTERVAL", { INTERVAL: { default: "60" } }, parseInteger),
        60,
      );
    });

    it("returns an explicit value from a matching override", () => {
      profile.fill({ rp: "fn", region: "westus" });
      const settings = {
        INTERVAL: {
          default: "60",
          override: [{ rp: ["aks", "fn"], region: ["eastus", "westus"], value: "300" }],
        },
      };
      assert.strictEqual(evaluateFeature("INTERVAL", settings, parseInteger), 300);
    });

    it("falls back to the default when an override value cannot be converted", () => {
      profile.fill({ os: "windows" });
      const settings = {
        INTERVAL: {
          default: "60",
          override: [{ os: ["windows"], value: "invalid" }],
        },
      };
      assert.strictEqual(evaluateFeature("INTERVAL", settings, parseInteger), 60);
    });

    it("returns undefined when the default cannot be converted", () => {
      assert.strictEqual(
        evaluateFeature("INTERVAL", { INTERVAL: { default: "invalid" } }, parseInteger),
        undefined,
      );
    });

    it("normalizes explicit enabled and disabled override values", () => {
      profile.fill({ os: "windows" });
      const settings = {
        F: { default: "enabled", override: [{ os: ["windows"], value: "disabled" }] },
      };
      assert.strictEqual(evaluateFeature("F", settings), false);
    });

    it("evaluates a JSON-encoded feature configuration", () => {
      profile.fill({ os: "windows" });
      const settings = {
        INTERVAL: JSON.stringify({
          default: "60",
          override: [{ os: "windows", value: "300" }],
        }),
      };
      assert.strictEqual(evaluateFeature("INTERVAL", settings, parseInteger), 300);
    });

    it("returns undefined for malformed JSON feature configuration", () => {
      assert.strictEqual(evaluateFeature("F", { F: "not-json" }), undefined);
    });

    it("flips the default when an override rule matches", () => {
      profile.fill({ os: "windows", component: "ext" });
      const settings = {
        F: { default: "disabled", override: [{ os: "windows", component: "ext" }] },
      };
      assert.strictEqual(evaluateFeature("F", settings), true);
    });

    it("keeps the default when no override rule matches", () => {
      profile.fill({ os: "windows", component: "ext" });
      const settings = {
        F: { default: "enabled", override: [{ os: "linux", component: "dst" }] },
      };
      assert.strictEqual(evaluateFeature("F", settings), true);
    });

    it("flips the default as soon as any rule in the list matches", () => {
      profile.fill({ os: "windows", component: "ext", rp: "fn" });
      const settings = {
        F: {
          default: "disabled",
          override: [{ os: "linux" }, { component: "ext", rp: "fn" }, { region: "eastus" }],
        },
      };
      assert.strictEqual(evaluateFeature("F", settings), true);
    });

    it("ignores non-object override rules", () => {
      profile.fill({ os: "windows" });
      const settings = {
        F: { default: "disabled", override: ["not-an-object", 5, null, { os: "windows" }] },
      };
      assert.strictEqual(evaluateFeature("F", settings), true);
    });

    it("returns the default when the override value is not an array", () => {
      profile.fill({ os: "windows" });
      const settings = { F: { default: "disabled", override: { os: "windows" } } };
      assert.strictEqual(evaluateFeature("F", settings), false);
    });

    it("ignores an override containing only a value", () => {
      const settings = { INTERVAL: { default: "60", override: [{ value: "300" }] } };
      assert.strictEqual(evaluateFeature("INTERVAL", settings, parseInteger), 60);
    });

    it.each([
      ["empty feature key", "", {} as Record<string, unknown>],
      ["feature absent from settings", "missing", {} as Record<string, unknown>],
      ["feature config is not an object", "F", { F: "invalid" } as Record<string, unknown>],
    ])("returns undefined for invalid input (%s)", (_desc, featureKey, settings) => {
      assert.strictEqual(evaluateFeature(featureKey, settings), undefined);
    });
  });

  describe("override rule matching (via evaluateFeature)", () => {
    // A feature that is disabled by default and enabled only when the single rule matches, so a
    // `true` result means "the rule matched" and `false` means "it did not".
    function ruleMatches(rule: Record<string, unknown>): boolean {
      return evaluateFeature("F", { F: { default: "disabled", override: [rule] } }) === true;
    }

    beforeEach(() => {
      profile.fill({ os: "windows", version: "1.0.0", component: "ext" });
    });

    it("matches when all conditions in the rule match", () => {
      assert.isTrue(ruleMatches({ os: "windows", component: "ext" }));
    });

    it("does not match when any condition in the rule fails", () => {
      assert.isFalse(ruleMatches({ os: "windows", component: "dst" }));
    });

    it("rejects a rule with ver but no accompanying component condition", () => {
      assert.isFalse(ruleMatches({ ver: "1.0.0" }));
      assert.isFalse(ruleMatches({ os: "windows", ver: "1.0.0" }));
    });

    it("honors ver when a matching component condition is present", () => {
      assert.isTrue(ruleMatches({ ver: "1.0.0", component: "ext" }));
    });

    it("fails when ver is present but the component does not match", () => {
      assert.isFalse(ruleMatches({ ver: "1.0.0", component: "dst" }));
    });

    it("never matches an empty rule", () => {
      assert.isFalse(ruleMatches({}));
    });
  });

  describe("condition matching (via evaluateFeature)", () => {
    function conditionMatches(rule: Record<string, unknown>): boolean {
      return evaluateFeature("F", { F: { default: "disabled", override: [rule] } }) === true;
    }

    beforeEach(() => {
      profile.fill({
        os: "windows",
        version: "1.0.0",
        component: "ext",
        rp: "fn",
        region: "westus",
        attach: "manual",
        ikey: "12345678-1234-1234-1234-123456789abc",
      });
    });

    it("matches os case-insensitively", () => {
      assert.isTrue(conditionMatches({ os: "WINDOWS" }));
      assert.isFalse(conditionMatches({ os: "linux" }));
    });

    it("matches ver exactly (with component present)", () => {
      assert.isTrue(conditionMatches({ ver: "1.0.0", component: "ext" }));
      assert.isFalse(conditionMatches({ ver: "2.0.0", component: "ext" }));
    });

    it("matches component exactly", () => {
      assert.isTrue(conditionMatches({ component: "ext" }));
      assert.isFalse(conditionMatches({ component: "dst" }));
    });

    it("matches rp exactly", () => {
      assert.isTrue(conditionMatches({ rp: "fn" }));
      assert.isFalse(conditionMatches({ rp: "appsvc" }));
    });

    it("matches region exactly", () => {
      assert.isTrue(conditionMatches({ region: "westus" }));
      assert.isFalse(conditionMatches({ region: "eastus" }));
    });

    it("matches attach exactly", () => {
      assert.isTrue(conditionMatches({ attach: "manual" }));
      assert.isFalse(conditionMatches({ attach: "integratedauto" }));
    });

    it("matches ikey case-insensitively", () => {
      assert.isTrue(conditionMatches({ ikey: "12345678-1234-1234-1234-123456789abc" }));
      assert.isTrue(conditionMatches({ ikey: "12345678-1234-1234-1234-123456789ABC" }));
      assert.isFalse(conditionMatches({ ikey: "00000000-0000-0000-0000-000000000000" }));
    });

    it("never matches an unknown condition key", () => {
      assert.isFalse(conditionMatches({ unknown: "value" }));
    });

    it("never matches a null condition value", () => {
      assert.isFalse(conditionMatches({ os: null }));
    });

    it("matches any candidate in a non-empty condition list", () => {
      assert.isTrue(conditionMatches({ rp: ["aks", "fn"] }));
      assert.isFalse(conditionMatches({ region: ["eastus", "centralus"] }));
      assert.isFalse(conditionMatches({ region: [] }));
    });
  });

  describe("integration", () => {
    beforeEach(() => {
      profile.fill({
        os: "windows",
        rp: "fn",
        attach: "manual",
        version: "1.0.0b20",
        component: "ext",
        region: "westus",
      });
    });

    it("resolves multiple features with mixed defaults and overrides", () => {
      const settings = {
        FEATURE_LIVE_METRICS: {
          default: "disabled",
          override: [
            { os: "windows" },
            { os: "linux", ver: "1.0.0b20", component: "dst" },
            { component: "dst", rp: "fn" },
          ],
        },
        FEATURE_SDK_STATS: {
          default: "enabled",
          override: [{ os: "windows" }],
        },
        FEATURE_PROFILING: {
          default: "disabled",
          override: [
            { os: "windows", ver: "2.0.0", component: "ext" },
            { component: "ext", rp: "fn", region: "westus" },
          ],
        },
      };

      // Disabled by default, but the Windows override matches -> enabled.
      assert.strictEqual(evaluateFeature("FEATURE_LIVE_METRICS", settings), true);
      // Enabled by default, but the OS override matches -> disabled.
      assert.strictEqual(evaluateFeature("FEATURE_SDK_STATS", settings), false);
      // Disabled by default; first rule's version fails, second matches -> enabled.
      assert.strictEqual(evaluateFeature("FEATURE_PROFILING", settings), true);
    });
  });
});
