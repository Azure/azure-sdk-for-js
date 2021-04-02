// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  FeatureFlag,
  featureFlagContentType,
  FeatureFlagPercentageClientFilter,
  featureFlagPrefix,
  FeatureFlagTargetingClientFilter,
  FeatureFlagTimeWindowClientFilter,
  isFeatureFlag
} from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
import { Context } from "mocha";

describe("AppConfigurationClient - FeatureFlag", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = startRecorder(this);
    client = createAppConfigurationClientForTests() || this.skip();
  });

  afterEach(async function(this: Context) {
    await recorder.stop();
  });

  describe("FeatureFlag configuration setting", () => {
    const clientFilters: (
      | Record<string, unknown>
      | FeatureFlagTargetingClientFilter
      | FeatureFlagTimeWindowClientFilter
      | FeatureFlagPercentageClientFilter
    )[] = [
      {
        name: "Microsoft.TimeWindow",
        parameters: {
          start: "Wed, 01 May 2019 13:59:59 GMT",
          end: "Mon, 01 July 2019 00:00:00 GMT"
        }
      },
      { name: "FilterX" },
      {
        name: "Microsoft.Targeting",
        parameters: {
          audience: {
            groups: [
              { name: "group-1", rolloutPercentage: 25 },
              { name: "group-2", rolloutPercentage: 45 }
            ],
            users: ["userA", "userB"],
            defaultRolloutPercentage: 40
          }
        }
      },
      { name: "Microsoft.Percentage", parameters: { value: 25 } }
    ];

    let baseSetting: FeatureFlag;
    let addResponse: AddConfigurationSettingResponse;

    beforeEach(async () => {
      baseSetting = {
        conditions: {
          clientFilters
        },
        enabled: false,
        isReadOnly: false,
        key: `${featureFlagPrefix + recorder.getUniqueName("name-1")}`,
        contentType: featureFlagContentType,
        description: "I'm a description",
        label: "label-1"
      };
      addResponse = await client.addConfigurationSetting(baseSetting);
    });

    afterEach(async () => {
      await client.deleteConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
    });

    function assertFeatureFlagProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: FeatureFlag
    ) {
      assert.equal(isFeatureFlag(actual), true, "Expected to get the feature flag");
      if (isFeatureFlag(actual)) {
        assert.equal(
          actual.key,
          expected.key,
          "Key from the response from get request is not as expected"
        );
        assert.deepEqual(
          actual.conditions,
          expected.conditions,
          "conditions from the response from get request is not as expected"
        );
        assert.equal(actual.description, expected.description);
        assert.equal(actual.enabled, expected.enabled);
        assert.equal(actual.isReadOnly, expected.isReadOnly);
        assert.equal(actual.label, expected.label);
        assert.equal(actual.contentType, expected.contentType);
      }
    }

    it("can add and get FeatureFlag", async () => {
      assertFeatureFlagProps(addResponse, baseSetting);
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertFeatureFlagProps(getResponse, baseSetting);
    });

    it("can add and update FeatureFlag", async () => {
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertFeatureFlagProps(getResponse, baseSetting);
      if (isFeatureFlag(getResponse)) {
        getResponse.enabled = !baseSetting.enabled;
      }

      const setResponse = await client.setConfigurationSetting(getResponse);
      assertFeatureFlagProps(setResponse, {
        ...baseSetting,
        enabled: !baseSetting.enabled
      });

      const getResponseAfterUpdate = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      assertFeatureFlagProps(getResponseAfterUpdate, {
        ...baseSetting,
        enabled: !baseSetting.enabled
      });
    });

    it("can add, list and update multiple FeatureFlags", async () => {
      const secondSetting = {
        ...baseSetting,
        key: `${baseSetting.key}-2`
      };
      await client.addConfigurationSetting(secondSetting);

      let numberOFFeatureFlagsReceived = 0;
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`
      })) {
        numberOFFeatureFlagsReceived++;
        if (setting.key === baseSetting.key) {
          assertFeatureFlagProps(setting, baseSetting);
          await client.setConfigurationSetting({
            ...baseSetting,
            enabled: !baseSetting.enabled
          } as FeatureFlag);
        } else {
          assertFeatureFlagProps(setting, secondSetting);
          await client.setConfigurationSetting({
            ...setting,
            description: "I'm new description"
          } as FeatureFlag);
        }
      }
      assert.equal(numberOFFeatureFlagsReceived, 2, "Unexpected number of FeatureFlags seen");

      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`
      })) {
        numberOFFeatureFlagsReceived--;
        if (setting.key === baseSetting.key) {
          assertFeatureFlagProps(setting, { ...baseSetting, enabled: !baseSetting.enabled });
        } else {
          assertFeatureFlagProps(setting, { ...secondSetting, description: "I'm new description" });
        }
      }

      assert.equal(
        numberOFFeatureFlagsReceived,
        0,
        "Unexpected number of FeatureFlags seen after updating"
      );
      await client.deleteConfigurationSetting({ key: secondSetting.key });
    });
  });
});
