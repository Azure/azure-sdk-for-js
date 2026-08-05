// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationProfileValues } from "./configurationProfile.js";
import { ConfigurationProfile } from "./configurationProfile.js";

/**
 * Determine whether a feature should be enabled from a OneSettings settings payload and the
 * process-wide {@link ConfigurationProfile}.
 *
 * Each feature entry has a `default` state (`enabled`/`disabled`) and an optional `override` list.
 * Every override rule is an independent set of conditions; if all conditions of any single rule
 * match the current profile, the feature's state is flipped from its default. If no rule matches,
 * the default is returned.
 *
 * @param featureKey - The feature name to evaluate, e.g. `FEATURE_SDK_STATS`.
 * @param settings - The `settings` object from a OneSettings response.
 * @returns `true` or `false` for the resolved state, or `undefined` when the inputs are invalid or
 *   the feature is absent, so callers can distinguish "no opinion" from an explicit disable.
 * @internal
 */
export function evaluateFeature(
  featureKey: string,
  settings: Record<string, unknown>,
): boolean | undefined {
  if (!featureKey || !isRecord(settings) || !Object.hasOwn(settings, featureKey)) {
    return undefined;
  }

  const featureConfig = settings[featureKey];
  if (!isRecord(featureConfig)) {
    return undefined;
  }

  // Coerce with String() before comparing: the payload is only JSON-decoded, so a malformed
  // "default" (e.g. a JSON boolean) would otherwise be compared as a non-string. A well-formed
  // string is unchanged; anything else safely resolves to the default-disabled state.
  const defaultState = String(featureConfig["default"] ?? "disabled").toLowerCase() === "enabled";

  const overrideList = featureConfig["override"];
  if (!Array.isArray(overrideList) || overrideList.length === 0) {
    return defaultState;
  }

  const profile = ConfigurationProfile.getInstance().snapshot();
  for (const rule of overrideList) {
    if (isRecord(rule) && matchesOverrideRule(rule, profile)) {
      // A rule matched: flip the default state.
      return !defaultState;
    }
  }

  return defaultState;
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
