// // Copyright (c) Microsoft Corporation.
// // Licensed under the MIT license.

import {
  AppConfigurationClient,
  ConfigurationSetting,
  featureFlagContentType,
  FeatureFlagValue,
  parseFeatureFlag
} from "../../src";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();
// import { assert } from "chai";
// import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
// import {
//   AddConfigurationSettingResponse,
//   AppConfigurationClient,
//   ConfigurationSetting,
//   featureFlagContentType,
//   featureFlagPrefix
// } from "../../src";
// import { Recorder } from "@azure/test-utils-recorder";
// import { Context } from "mocha";
// import { FeatureFlagHelper, FeatureFlag } from "../../src/featureFlag";

// describe.only("AppConfigurationClient - FeatureFlag", () => {
//   describe("FeatureFlag configuration setting", () => {
//     let client: AppConfigurationClient;
//     let recorder: Recorder;

//     beforeEach(async function(this: Context) {
//       recorder = startRecorder(this);
//       client = createAppConfigurationClientForTests() || this.skip();
//       baseSetting = {
//         value: {
//           conditions: {
//             clientFilters
//           },
//           enabled: false,
//           description: "I'm a description"
//         },
//         isReadOnly: false,
//         key: `${featureFlagPrefix + recorder.getUniqueName("name-1")}`,
//         contentType: featureFlagContentType,
//         label: "label-1"
//       };
//       addResponse = await client.addConfigurationSetting(baseSetting);
//     });

//     afterEach(async function(this: Context) {
//       await client.deleteConfigurationSetting({
//         key: baseSetting.key,
//         label: baseSetting.label
//       });
//       await recorder.stop();
//     });

//     const clientFilters: Record<string, unknown>[] = [
//       {
//         name: "Microsoft.TimeWindow",
//         parameters: {
//           start: "Wed, 01 May 2019 13:59:59 GMT",
//           end: "Mon, 01 July 2019 00:00:00 GMT"
//         }
//       },
//       { name: "FilterX" },
//       {
//         name: "Microsoft.Targeting",
//         parameters: {
//           audience: {
//             groups: [
//               { name: "group-1", rolloutPercentage: 25 },
//               { name: "group-2", rolloutPercentage: 45 }
//             ],
//             users: ["userA", "userB"],
//             defaultRolloutPercentage: 40
//           }
//         }
//       },
//       { name: "Microsoft.Percentage", parameters: { value: 25 } }
//     ];

//     let baseSetting: FeatureFlag;
//     let addResponse: AddConfigurationSettingResponse;

//     function assertFeatureFlagProps(
//       actual: Omit<AddConfigurationSettingResponse, "_response">,
//       expected: ConfigurationSetting
//     ) {
//       assert.equal(
//         FeatureFlagHelper.isFeatureFlagConfigurationSetting(actual),
//         true,
//         "Expected to get the feature flag"
//       );
//       assert.isDefined(actual.value, "Expected the value to be defined");
//       const featureFlagValue = FeatureFlagHelper.deserializeFeatureFlagValue(actual.value!);
//       assert.equal(
//         actual.key,
//         expected.key,
//         "Key from the response from get request is not as expected"
//       );
//       assert.deepEqual(
//         featureFlagValue.conditions,
//         expected.conditions,
//         "conditions from the response from get request is not as expected"
//       );
//       assert.equal(featureFlagValue.description, expected.description);
//       assert.equal(featureFlagValue.enabled, expected.enabled);
//       assert.equal(actual.isReadOnly, expected.isReadOnly);
//       assert.equal(actual.label, expected.label);
//       assert.equal(actual.contentType, expected.contentType);
//     }

//     it("can add and get FeatureFlag", async () => {
//       assertFeatureFlagProps(addResponse, baseSetting);
//       const getResponse = await client.getConfigurationSetting({
//         key: baseSetting.key,
//         label: baseSetting.label
//       });
//       assertFeatureFlagProps(getResponse, baseSetting);
//     });

//     it("can add and update FeatureFlag", async () => {
//       const getResponse = await client.getConfigurationSetting({
//         key: baseSetting.key,
//         label: baseSetting.label
//       });
//       assertFeatureFlagProps(getResponse, baseSetting);

//       const featureFlagValue = FeatureFlagHelper.deserializeFeatureFlagValue(getResponse.value!);
//       featureFlagValue.enabled = !baseSetting.enabled;

//       const setResponse = await client.setConfigurationSetting({
//         ...getResponse,
//         value: FeatureFlagHelper.serializeFeatureFlagValue(featureFlagValue)
//       });
//       assertFeatureFlagProps(setResponse, {
//         ...baseSetting,
//         enabled: !baseSetting.enabled
//       });

//       const getResponseAfterUpdate = await client.getConfigurationSetting({
//         key: baseSetting.key,
//         label: baseSetting.label
//       });
//       assertFeatureFlagProps(getResponseAfterUpdate, {
//         ...baseSetting,
//         enabled: !baseSetting.enabled
//       });
//     });

//     it("can add, list and update multiple FeatureFlags", async () => {
//       const secondSetting = {
//         ...baseSetting,
//         key: `${baseSetting.key}-2`
//       };
//       await client.addConfigurationSetting(secondSetting);

//       let numberOFFeatureFlagsReceived = 0;
//       for await (const setting of client.listConfigurationSettings({
//         keyFilter: `${baseSetting.key}*`
//       })) {
//         numberOFFeatureFlagsReceived++;
//         if (setting.key === baseSetting.key) {
//           assertFeatureFlagProps(setting, baseSetting);
//           await client.setConfigurationSetting({
//             ...baseSetting,
//             enabled: !baseSetting.enabled
//           } as FeatureFlag);
//         } else {
//           assertFeatureFlagProps(setting, secondSetting);
//           await client.setConfigurationSetting({
//             ...setting,
//             description: "I'm new description"
//           } as FeatureFlag);
//         }
//       }
//       assert.equal(numberOFFeatureFlagsReceived, 2, "Unexpected number of FeatureFlags seen");

//       for await (const setting of client.listConfigurationSettings({
//         keyFilter: `${baseSetting.key}*`
//       })) {
//         numberOFFeatureFlagsReceived--;
//         if (setting.key === baseSetting.key) {
//           assertFeatureFlagProps(setting, { ...baseSetting, enabled: !baseSetting.enabled });
//         } else {
//           assertFeatureFlagProps(setting, { ...secondSetting, description: "I'm new description" });
//         }
//       }

//       assert.equal(
//         numberOFFeatureFlagsReceived,
//         0,
//         "Unexpected number of FeatureFlags seen after updating"
//       );
//       await client.deleteConfigurationSetting({ key: secondSetting.key });
//     });
//   });

//   // describe("FeatureFlag utils", () => {
//   //   [featureFlagPrefix + "abcd", "abcd"].forEach((key) => {
//   //     it(`serializeFeatureFlagParam for a feature flag with key=${key}`, () => {
//   //       assert.equal(
//   //         serializeFeatureFlagParam({
//   //           key,
//   //           value: `xyz`,
//   //           conditions: { clientFilters: [] },
//   //           enabled: false
//   //         }).key,
//   //         featureFlagPrefix + "abcd",
//   //         "Unexpected key in the setting"
//   //       );
//   //     });
//   //   });
//   // });
// });

describe.only("Option 8.1", () => {
  it("FeatureFlag redesign", async () => {
    console.log(`Running featureFlag sample`);
    const originalFeatureFlag: ConfigurationSetting<FeatureFlagValue> = {
      key: `new-feature-flag-${Math.ceil(100 + Math.random() * 900)}`,
      isReadOnly: false,
      contentType: featureFlagContentType,
      value: {
        enabled: false,
        description: "I'm a description",
        conditions: {
          clientFilters: [
            {
              name: "Microsoft.TimeWindow",
              parameters: {
                start: "Wed, 01 May 2021 13:59:59 GMT",
                end: "Mon, 01 July 2022 00:00:00 GMT"
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
          ]
        }
      }
    };

    // Set the following environment variable or edit the value on the following line.
    const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
    const appConfigClient = new AppConfigurationClient(connectionString);

    await cleanupSampleValues([originalFeatureFlag.key], appConfigClient); // Ignore - cleanup

    console.log(`Add a new featureFlag with key: ${originalFeatureFlag.key}`);
    await appConfigClient.addConfigurationSetting(originalFeatureFlag);

    console.log(`Get the added configurationSetting with key: ${originalFeatureFlag.key}`);
    const getResponse = await appConfigClient.getConfigurationSetting({
      key: originalFeatureFlag.key
    });
    const newFeatureFlag = parseFeatureFlag(getResponse); // Converts the configurationsetting into featureflag
    // Modify the props
    for (const clientFilter of newFeatureFlag.value.conditions.clientFilters) {
      if (clientFilter.name === "Microsoft.Targeting") {
        // some of the fields:
        // clientFilter.parameters.audience
        // clientFilter.parameters.audience.groups[0].name
        // clientFilter.parameters.audience.groups[0].rolloutPercentage
        // clientFilter.parameters.audience.users[0]         // string
        // clientFilter.parameters.audience.defaultRolloutPercentage
        console.log(
          `  targeting feature flag client filter => name: ${
            clientFilter.name
          }, audience: ${JSON.stringify(clientFilter.parameters!.audience, null, 2)}`
        );
        clientFilter.parameters = {
          ...clientFilter.parameters,
          audience: {
            ...(clientFilter.parameters!.audience as { [key: string]: unknown }),
            defaultRolloutPercentage: 85
          }
        };
      } else if (clientFilter.name === "Microsoft.TimeWindow") {
        // clientFilter.parameters.end;
        // clientFilter.parameters.start;
        console.log(
          `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${
            clientFilter.parameters!.start
          }`
        );
        clientFilter.parameters = {
          ...clientFilter.parameters,
          start: "Wed, 01 June 2021 13:59:59 GMT"
        };
      } else if (clientFilter.name === "Microsoft.Percentage") {
        console.log(
          `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${
            clientFilter.parameters!.value
          }`
        );
        clientFilter.parameters = {
          ...clientFilter.parameters,
          value: 56
        };
      } else {
        console.log(
          `  name of the custom feature flag client filter => name : ${clientFilter.name}`
        );
        clientFilter.name = "FilterY";
      }
    }

    console.log(`===> Update the featureFlag`);
    // Updating the config setting
    await appConfigClient.setConfigurationSetting(newFeatureFlag);

    // Get the config setting again
    console.log(`Get the updated config setting with key: ${newFeatureFlag.key}`);
    const getResponseAfterUpdate = await appConfigClient.getConfigurationSetting({
      key: newFeatureFlag.key
    });
    const featureFlagAfterUpdate = parseFeatureFlag(getResponseAfterUpdate); // Converts the configurationsetting into featureflag
    const conditions = featureFlagAfterUpdate.value.conditions;
    for (const clientFilter of conditions.clientFilters) {
      if (clientFilter.name === "Microsoft.Targeting") {
        console.log(
          `  targeting feature flag client filter => name: ${
            clientFilter.name
          }, audience: ${JSON.stringify(clientFilter.parameters!.audience, null, 2)}`
        );
      } else if (clientFilter.name === "Microsoft.TimeWindow") {
        console.log(
          `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${
            clientFilter.parameters!.start
          }`
        );
      } else if (clientFilter.name === "Microsoft.Percentage") {
        console.log(
          `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${
            clientFilter.parameters!.value
          }`
        );
      } else {
        console.log(
          `  name of the custom feature flag client filter => name : ${clientFilter.name}`
        );
      }
    }
    await cleanupSampleValues([originalFeatureFlag.key], appConfigClient);
  });
});

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}
