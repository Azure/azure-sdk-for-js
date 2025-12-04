// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationSetting } from "../../src/index.js";
import { featureFlagContentType } from "../../src/index.js";
import { parseFeatureFlag } from "../../src/featureFlag.js";
import { describe, it, assert } from "vitest";

describe("FeatureFlag - Optional Fields", () => {
  it("should parse feature flag with only id field", () => {
    const minimalFeatureFlag = {
      key: ".appconfig.featureflag/minimal-flag",
      value: JSON.stringify({ id: "minimal-flag" }),
      contentType: featureFlagContentType,
    } as ConfigurationSetting;

    const parsed = parseFeatureFlag(minimalFeatureFlag);
    assert.equal(parsed.value.id, "minimal-flag");
    assert.equal(parsed.value.enabled, false); // defaults to false when not provided
    assert.isDefined(parsed.value.conditions);
    assert.deepEqual(parsed.value.conditions.clientFilters, []); // defaults to empty array
    assert.isUndefined(parsed.value.description);
    assert.isUndefined(parsed.value.displayName);
  });

  it("should parse feature flag without conditions", () => {
    const featureFlagWithoutConditions = {
      key: ".appconfig.featureflag/no-conditions",
      value: JSON.stringify({
        id: "no-conditions",
        enabled: true,
        description: "A feature flag without conditions",
        display_name: "No Conditions Flag",
      }),
      contentType: featureFlagContentType,
    } as ConfigurationSetting;

    const parsed = parseFeatureFlag(featureFlagWithoutConditions);
    assert.equal(parsed.value.id, "no-conditions");
    assert.equal(parsed.value.enabled, true);
    assert.equal(parsed.value.description, "A feature flag without conditions");
    assert.equal(parsed.value.displayName, "No Conditions Flag");
    assert.isDefined(parsed.value.conditions);
    assert.deepEqual(parsed.value.conditions.clientFilters, []); // defaults to empty array
  });

  it("should parse feature flag with empty conditions", () => {
    const featureFlagWithEmptyConditions = {
      key: ".appconfig.featureflag/empty-conditions",
      value: JSON.stringify({
        id: "empty-conditions",
        enabled: false,
        conditions: {
          client_filters: [],
        },
      }),
      contentType: featureFlagContentType,
    } as ConfigurationSetting;

    const parsed = parseFeatureFlag(featureFlagWithEmptyConditions);
    assert.equal(parsed.value.id, "empty-conditions");
    assert.equal(parsed.value.enabled, false);
    assert.isDefined(parsed.value.conditions);
    assert.deepEqual(parsed.value.conditions?.clientFilters, []);
    assert.isUndefined(parsed.value.conditions?.requirementType);
  });

  it("should parse feature flag with conditions and requirement_type", () => {
    const fullFeatureFlag = {
      key: ".appconfig.featureflag/full-flag",
      value: JSON.stringify({
        id: "full-flag",
        enabled: true,
        description: "Full feature flag",
        display_name: "Full Flag",
        conditions: {
          client_filters: [{ name: "Filter1", parameters: { key: "value" } }, { name: "Filter2" }],
          requirement_type: "All",
        },
      }),
      contentType: featureFlagContentType,
    } as ConfigurationSetting;

    const parsed = parseFeatureFlag(fullFeatureFlag);
    assert.equal(parsed.value.id, "full-flag");
    assert.equal(parsed.value.enabled, true);
    assert.equal(parsed.value.description, "Full feature flag");
    assert.equal(parsed.value.displayName, "Full Flag");
    assert.isDefined(parsed.value.conditions);
    assert.equal(parsed.value.conditions?.clientFilters.length, 2);
    assert.equal(parsed.value.conditions?.requirementType, "All");
  });
});
