// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import {
  AddConfigurationSettingResponse,
  AppConfigurationClient,
  ConfigurationSetting,
  featureFlagContentType,
  featureFlagPrefix,
} from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { FeatureFlagValue, isFeatureFlag, parseFeatureFlag } from "../../src/featureFlag";

describe("AppConfigurationClient - FeatureFlag", () => {
  describe("FeatureFlag configuration setting", () => {
    let client: AppConfigurationClient;
    let recorder: Recorder;
    let baseSetting: ConfigurationSetting<FeatureFlagValue>;
    let addResponse: AddConfigurationSettingResponse;

    beforeEach(async function (this: Context) {
      recorder = startRecorder(this);
      client = createAppConfigurationClientForTests() || this.skip();
      baseSetting = {
        value: {
          conditions: {
            clientFilters: [
              {
                name: "Microsoft.TimeWindow",
                parameters: {
                  Start: "Wed, 01 May 2019 13:59:59 GMT",
                  End: "Mon, 01 July 2019 00:00:00 GMT",
                },
              },
              { name: "FilterX" },
              {
                name: "Microsoft.Targeting",
                parameters: {
                  Audience: {
                    Groups: [
                      { Name: "group-1", RolloutPercentage: 25 },
                      { Name: "group-2", RolloutPercentage: 45 },
                    ],
                    Users: ["userA", "userB"],
                    DefaultRolloutPercentage: 40,
                  },
                },
              },
              { name: "Microsoft.Percentage", parameters: { Value: 25 } },
            ],
          },
          enabled: false,
          description: "I'm a description",
          displayName: "for display",
        },
        isReadOnly: false,
        key: `${featureFlagPrefix + recorder.getUniqueName("name-1")}`,
        contentType: featureFlagContentType,
        label: "label-1",
      };
      addResponse = await client.addConfigurationSetting(baseSetting);
    });

    afterEach(async function (this: Context) {
      await client.deleteConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      await recorder.stop();
    });

    function assertFeatureFlagProps(
      actual: Omit<AddConfigurationSettingResponse, "_response">,
      expected: ConfigurationSetting<FeatureFlagValue>
    ): void {
      assert.equal(isFeatureFlag(actual), true, "Expected to get the feature flag");
      assert.isDefined(actual.value, "Expected the value to be defined");
      const featureFlagValue = parseFeatureFlag(actual).value;
      assert.equal(
        actual.key,
        expected.key,
        "Key from the response from get request is not as expected"
      );
      assert.deepEqual(
        featureFlagValue.conditions,
        expected.value.conditions,
        "conditions from the response from get request is not as expected"
      );
      assert.equal(featureFlagValue.description, expected.value.description);
      assert.equal(featureFlagValue.enabled, expected.value.enabled);
      assert.equal(actual.isReadOnly, expected.isReadOnly);
      assert.equal(actual.label, expected.label);
      assert.equal(actual.contentType, expected.contentType);
    }

    it("can add and get FeatureFlag", async () => {
      assertFeatureFlagProps(addResponse, baseSetting);
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      assertFeatureFlagProps(getResponse, baseSetting);
    });

    it("can add and update FeatureFlag", async () => {
      const getResponse = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      assertFeatureFlagProps(getResponse, baseSetting);

      const featureFlag = parseFeatureFlag(getResponse);
      featureFlag.value.enabled = !baseSetting.value.enabled;

      const setResponse = await client.setConfigurationSetting(featureFlag);
      assertFeatureFlagProps(setResponse, {
        ...baseSetting,
        value: { ...baseSetting.value, enabled: !baseSetting.value.enabled },
      });

      const getResponseAfterUpdate = await client.getConfigurationSetting({
        key: baseSetting.key,
        label: baseSetting.label,
      });
      assertFeatureFlagProps(getResponseAfterUpdate, {
        ...baseSetting,
        value: { ...baseSetting.value, enabled: !baseSetting.value.enabled },
      });
    });

    it("can add, list and update multiple FeatureFlags", async () => {
      const secondSetting = {
        ...baseSetting,
        key: `${baseSetting.key}-2`,
      };
      await client.addConfigurationSetting(secondSetting);

      let numberOFFeatureFlagsReceived = 0;
      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`,
      })) {
        numberOFFeatureFlagsReceived++;
        if (setting.key === baseSetting.key) {
          assertFeatureFlagProps(setting, baseSetting);
          await client.setConfigurationSetting({
            ...baseSetting,
            value: { ...baseSetting.value, enabled: !baseSetting.value.enabled },
          });
        } else {
          assertFeatureFlagProps(setting, secondSetting);
          const parsedSetting = parseFeatureFlag(setting);
          await client.setConfigurationSetting({
            ...parsedSetting,
            value: { ...parsedSetting.value, description: "I'm new description" },
          });
        }
      }
      assert.equal(numberOFFeatureFlagsReceived, 2, "Unexpected number of FeatureFlags seen");

      for await (const setting of client.listConfigurationSettings({
        keyFilter: `${baseSetting.key}*`,
      })) {
        numberOFFeatureFlagsReceived--;
        if (setting.key === baseSetting.key) {
          assertFeatureFlagProps(setting, {
            ...baseSetting,
            value: { ...baseSetting.value, enabled: !baseSetting.value.enabled },
          });
        } else {
          assertFeatureFlagProps(setting, {
            ...secondSetting,
            value: { ...secondSetting.value, description: "I'm new description" },
          });
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

  describe("serializeAsConfigurationSettingParam", () => {
    let client: AppConfigurationClient;
    let recorder: Recorder;
    let featureFlag: ConfigurationSetting<FeatureFlagValue>;
    beforeEach(async function (this: Context) {
      recorder = startRecorder(this);
      client = createAppConfigurationClientForTests() || this.skip();
      featureFlag = {
        contentType: featureFlagContentType,
        key: `${featureFlagPrefix}${recorder.getUniqueName("name-1")}`,
        isReadOnly: false,
        value: { conditions: { clientFilters: [] }, enabled: true },
      };
    });

    afterEach(async function (this: Context) {
      await client.deleteConfigurationSetting({ key: featureFlag.key });
      await recorder.stop();
    });

    [`[]`, "Hello World"].forEach((value) => {
      it(`Unexpected value ${value} as feature flag value`, async () => {
        featureFlag.value = value as any;
        await client.addConfigurationSetting(featureFlag);
        assert.equal(
          (await client.getConfigurationSetting({ key: featureFlag.key })).value,
          value,
          "message"
        );
      });
    });
  });
});
