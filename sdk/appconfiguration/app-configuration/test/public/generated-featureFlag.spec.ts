
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { assert } from "vitest";
import type {
  FeatureFlagValue
} from "../../src/featureFlag.js";
import {
  FeatureFlagHelper,
  parseFeatureFlag,
  featureFlagPrefix
} from "../../src/featureFlag.js";
import type { ConfigurationSetting, ConfigurationSettingParam } from "../../src/models.js";

describe("FeatureFlagHelper", () => {
  describe("toConfigurationSettingParam", () => {
    it("throws TypeError when featureFlag.value is falsy", () => {
      const invalidFeatureFlag = {
        key: "feature-toggle",
        value: null,
      };
      assert.throws(
        () => FeatureFlagHelper.toConfigurationSettingParam(invalidFeatureFlag as unknown as ConfigurationSettingParam<FeatureFlagValue>),
        TypeError,
        "FeatureFlag has an unexpected value - null",
      );
    });

    it("adds prefix to key if missing", () => {
      const featureFlagWithoutPrefix: ConfigurationSettingParam<FeatureFlagValue> = {
        key: "new-feature",
        value: { id: "new-feature", enabled: true, conditions: { clientFilters: [] } },
      };
      const result = FeatureFlagHelper.toConfigurationSettingParam(featureFlagWithoutPrefix);
      assert.ok(result.key.startsWith(featureFlagPrefix));
      assert.equal(result.key, `${featureFlagPrefix}new-feature`);
    });

    it("uses key as id when featureFlag.value.id is missing", () => {
      const featureFlagMissingId: ConfigurationSettingParam<FeatureFlagValue> = {
        key: `${featureFlagPrefix}missing-id-feature`,
        value: { id: undefined, enabled: true, conditions: { clientFilters: [] } },
      };
      const result = FeatureFlagHelper.toConfigurationSettingParam(featureFlagMissingId);
      const parsedValue = JSON.parse(result.value as string);
      assert.equal(parsedValue.id, "missing-id-feature");
    });
  });

  describe("parseFeatureFlag", () => {
    it("throws TypeError when setting is not a valid feature flag (wrong content-type)", () => {
      const invalidSetting = {
        key: ".appconfig.featureflag/invalid-setting",
        contentType: "text/plain",
        value: "some invalid value",
      };
      assert.throws(
        () => parseFeatureFlag(invalidSetting as ConfigurationSetting),
        TypeError,
        `Setting with key ${invalidSetting.key} is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`,
      );
    });

    it("throws TypeError when setting has null value", () => {
      const invalidSetting = {
        key: "some-key",
        contentType: "application/vnd.microsoft.appconfig.ff+json;charset=utf-8",
        value: null,
      };
      assert.throws(
        () => parseFeatureFlag(invalidSetting as unknown as ConfigurationSetting),
        TypeError,
        `Setting with key ${invalidSetting.key} is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`,
      );
    });

    it("adds prefix to setting key if missing", () => {
      const settingWithoutPrefix: ConfigurationSetting = {
        key: "feature-without-prefix",
        contentType: "application/vnd.microsoft.appconfig.ff+json;charset=utf-8",
        value: JSON.stringify({ id: "feature-without-prefix", enabled: true, conditions: { client_filters: [] } }),
        isReadOnly: false,
      };
      const result = parseFeatureFlag(settingWithoutPrefix);
      assert.ok(result.key.startsWith(featureFlagPrefix));
      assert.equal(result.key, `${featureFlagPrefix}feature-without-prefix`);
    });
  });
});
