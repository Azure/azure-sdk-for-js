
import { describe, it } from "vitest";
import { assert } from "vitest";
import {
  FeatureFlagHelper,
  parseFeatureFlag,
  featureFlagContentType,
  featureFlagPrefix,
} from "./featureFlag.js";

describe("FeatureFlagHelper", () => {
  describe("toConfigurationSettingParam", () => {
    it("throws TypeError when featureFlag.value is falsy", () => {
      assert.throws(() => {
        FeatureFlagHelper.toConfigurationSettingParam({
          key: "my-flag",
          value: null as any,
        });
      }, TypeError, "FeatureFlag has an unexpected value - null");
    });

    it("automatically adds prefix to featureFlag.key if missing", () => {
      const result = FeatureFlagHelper.toConfigurationSettingParam({
        key: "my-flag",
        value: {
          id: "my-flag",
          enabled: true,
          conditions: { clientFilters: [] },
        },
      });

      assert.ok(result.key.startsWith(featureFlagPrefix));
      assert.equal(result.key, `${featureFlagPrefix}my-flag`);
    });
  });

  describe("parseFeatureFlag", () => {
    it("throws TypeError when content-type is invalid", () => {
      assert.throws(() => {
        parseFeatureFlag({
          key: `${featureFlagPrefix}invalid-feature`,
          contentType: "text/plain",
          value: '{"id":"invalid-feature","enabled":true}',
        });
      }, TypeError, `Setting with key ${featureFlagPrefix}invalid-feature is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`);
    });

    it("throws TypeError when value is null or malformed", () => {
      assert.throws(() => {
        parseFeatureFlag({
          key: `${featureFlagPrefix}invalid-feature`,
          contentType: featureFlagContentType,
          value: null as any,
        });
      }, TypeError, `Setting with key ${featureFlagPrefix}invalid-feature is not a valid FeatureFlag, make sure to have the correct content-type and a valid non-null value.`);
    });

    it("automatically adds prefix to setting.key if missing", () => {
      const result = parseFeatureFlag({
        key: "feature-without-prefix",
        contentType: featureFlagContentType,
        value: '{"id":"feature-without-prefix","enabled":true,"conditions":{"client_filters":[]}}',
      });

      assert.ok(result.key.startsWith(featureFlagPrefix));
      assert.equal(result.key, `${featureFlagPrefix}feature-without-prefix`);
      assert.deepEqual(result.value, {
        id: "feature-without-prefix",
        enabled: true,
        description: undefined,
        displayName: undefined,
        conditions: { clientFilters: [] },
      });
    });
  });
});

