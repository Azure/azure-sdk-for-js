// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { ConfigurationProfileValues } from "./configurationProfile.js";
import { ConfigurationProfile } from "./configurationProfile.js";

interface OverrideRule {
  conditions: Record<string, unknown>;
  value?: string;
}

interface FeatureConfig {
  defaultValue: string;
  overrides: OverrideRule[];
}

type ValueConverter<T> = (value: string) => T;

/**
 * Evaluate a setting from a OneSettings payload and the process-wide {@link ConfigurationProfile}.
 *
 * Each feature entry has a string `default` and an optional `override` list. A matching override
 * can provide its own string `value`. Legacy `enabled`/`disabled` values are converted to booleans,
 * while other values are preserved or converted by `valueConverter`.
 *
 * @param featureKey - The setting name to evaluate, e.g. `FEATURE_SDK_STATS`.
 * @param settings - The `settings` object from a OneSettings response.
 * @param valueConverter - Optional converter applied to the default or matching override value.
 * @returns The evaluated value, or `undefined` when the input or conversion is invalid.
 * @internal
 */
export function evaluateFeature<T>(
  featureKey: string,
  settings: Readonly<Record<string, unknown>>,
  valueConverter: ValueConverter<T>,
): T | undefined;
export function evaluateFeature(
  featureKey: string,
  settings: Readonly<Record<string, unknown>>,
): boolean | string | undefined;
export function evaluateFeature<T>(
  featureKey: string,
  settings: Readonly<Record<string, unknown>>,
  valueConverter?: ValueConverter<T>,
): boolean | string | T | undefined {
  if (!featureKey || !isRecord(settings) || !Object.hasOwn(settings, featureKey)) {
    return undefined;
  }

  const featureConfig = parseFeatureConfig(settings[featureKey]);
  if (!featureConfig) {
    return undefined;
  }

  const defaultValue = normalizeSettingValue(featureConfig.defaultValue, valueConverter);

  const profile = ConfigurationProfile.getInstance().snapshot();
  for (const rule of featureConfig.overrides) {
    if (matchesOverrideRule(rule.conditions, profile)) {
      if (rule.value !== undefined) {
        const overrideValue = normalizeSettingValue(rule.value, valueConverter);
        return overrideValue === undefined ? defaultValue : overrideValue;
      }
      if (typeof defaultValue === "boolean") {
        return !defaultValue;
      }
      break;
    }
  }

  return defaultValue;
}

function parseFeatureConfig(rawConfig: unknown): FeatureConfig | undefined {
  let config = rawConfig;
  if (typeof config === "string") {
    try {
      config = JSON.parse(config);
    } catch (error) {
      diag.debug("Failed to parse OneSettings feature configuration:", error);
      return undefined;
    }
  }

  if (!isRecord(config) || typeof config["default"] !== "string") {
    return undefined;
  }

  const rawOverrides = Array.isArray(config["override"]) ? config["override"] : [];
  const overrides: OverrideRule[] = [];
  for (const rawOverride of rawOverrides) {
    const override = parseOverrideRule(rawOverride);
    if (override) {
      overrides.push(override);
    }
  }
  return { defaultValue: config["default"], overrides };
}

function parseOverrideRule(rawRule: unknown): OverrideRule | undefined {
  if (!isRecord(rawRule)) {
    return undefined;
  }

  const conditions = Object.fromEntries(Object.entries(rawRule).filter(([key]) => key !== "value"));
  if (Object.keys(conditions).length === 0) {
    return undefined;
  }

  if (Object.hasOwn(rawRule, "value")) {
    const value = rawRule["value"];
    if (typeof value !== "string") {
      return undefined;
    }
    return { conditions, value };
  }
  return { conditions };
}

function normalizeSettingValue<T>(
  value: string,
  valueConverter?: ValueConverter<T>,
): boolean | string | T | undefined {
  if (valueConverter) {
    try {
      return valueConverter(value);
    } catch (error) {
      diag.debug("Failed to convert OneSettings value:", error);
      return undefined;
    }
  }

  if (value.toLowerCase() === "enabled") {
    return true;
  }
  if (value.toLowerCase() === "disabled") {
    return false;
  }
  return value;
}

/**
 * Return true when every condition in a single override rule matches the profile.
 *
 * A `ver` condition is only honored when the rule also carries a `component` condition (per the
 * OneSettings schema, `ver` requires `component`); a rule with `ver` but no `component` never
 * matches. An empty rule never matches.
 */
function matchesOverrideRule(
  rule: Record<string, unknown>,
  profile: Readonly<ConfigurationProfileValues>,
): boolean {
  const keys = Object.keys(rule);
  if (keys.length === 0) {
    return false;
  }
  if ("ver" in rule && !("component" in rule)) {
    return false;
  }
  for (const key of keys) {
    if (!matchesCondition(key, rule[key], profile)) {
      return false;
    }
  }
  return true;
}

/**
 * Return true when a single condition matches the profile. Unknown keys, empty keys, and
 * null/undefined values never match. Matching is exact, and case-insensitive for `os` and `ikey`.
 */
function matchesCondition(
  key: string,
  value: unknown,
  profile: Readonly<ConfigurationProfileValues>,
): boolean {
  if (!key || value === null || value === undefined) {
    return false;
  }
  if (Array.isArray(value)) {
    return value.length > 0 && value.some((candidate) => matchesCondition(key, candidate, profile));
  }
  const expected = String(value);
  switch (key) {
    case "os":
      return profile.os.toLowerCase() === expected.toLowerCase();
    case "ver":
      return profile.version === expected;
    case "component":
      return profile.component === expected;
    case "rp":
      return profile.rp === expected;
    case "region":
      return profile.region === expected;
    case "attach":
      return profile.attach === expected;
    case "ikey":
      return profile.ikey.toLowerCase() === expected.toLowerCase();
    default:
      return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
