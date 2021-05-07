// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  ConfigurationSetting,
  featureFlagContentType,
  featureFlagPrefix
} from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
import { Context } from "mocha";
import { FeatureFlagHelper } from "../../src/featureFlag";

describe.only("AppConfigurationClient - FeatureFlag", () => {
  describe("FeatureFlag configuration setting", () => {
    let client: AppConfigurationClient;
    let recorder: Recorder;

    beforeEach(async function(this: Context) {
      recorder = startRecorder(this);
      client = createAppConfigurationClientForTests() || this.skip();
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

    afterEach(async function(this: Context) {
      await client.deleteConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label
      });
      await recorder.stop();
    });

    const clientFilters: Record<string, unknown>[] = [
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

    let baseSetting: ConfigurationSetting;
    let addResponse: AddConfigurationSettingResponse;

    function assertFeatureFlagProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: ConfigurationSetting
    ) {
      assert.equal(
        FeatureFlagHelper.isFeatureFlagConfigurationSetting(actual),
        true,
        "Expected to get the feature flag"
      );
      assert.isDefined(actual.value, "Expected the value to be defined");
      const featureFlagValue = FeatureFlagHelper.deserializeFeatureFlagValue(actual.value!);
      assert.equal(
        actual.key,
        expected.key,
        "Key from the response from get request is not as expected"
      );
      assert.deepEqual(
        featureFlagValue.conditions,
        expected.conditions,
        "conditions from the response from get request is not as expected"
      );
      assert.equal(featureFlagValue.description, expected.description);
      assert.equal(featureFlagValue.enabled, expected.enabled);
      assert.equal(actual.isReadOnly, expected.isReadOnly);
      assert.equal(actual.label, expected.label);
      assert.equal(actual.contentType, expected.contentType);
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

      const featureFlagValue = FeatureFlagHelper.deserializeFeatureFlagValue(getResponse.value!);
      featureFlagValue.enabled = !baseSetting.enabled;

      const setResponse = await client.setConfigurationSetting({
        ...getResponse,
        value: FeatureFlagHelper.serializeFeatureFlagValue(featureFlagValue)
      });
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

  // describe("FeatureFlag utils", () => {
  //   [featureFlagPrefix + "abcd", "abcd"].forEach((key) => {
  //     it(`serializeFeatureFlagParam for a feature flag with key=${key}`, () => {
  //       assert.equal(
  //         serializeFeatureFlagParam({
  //           key,
  //           value: `xyz`,
  //           conditions: { clientFilters: [] },
  //           enabled: false
  //         }).key,
  //         featureFlagPrefix + "abcd",
  //         "Unexpected key in the setting"
  //       );
  //     });
  //   });
  // });
});
