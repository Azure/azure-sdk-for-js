// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 *
 * @azsdk-weight 20
 */
import {
  AppConfigurationClient,
  ConfigurationSetting,
  featureFlagContentType,
  FeatureFlagValue,
  parseFeatureFlag
} from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
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
              Start: "Wed, 01 May 2021 13:59:59 GMT",
              End: "Mon, 01 July 2022 00:00:00 GMT"
            }
          },
          { name: "FilterX" },
          {
            name: "Microsoft.Targeting",
            parameters: {
              Audience: {
                Groups: [
                  { name: "group-1", RolloutPercentage: 25 },
                  { name: "group-2", RolloutPercentage: 45 }
                ],
                Users: ["userA", "userB"],
                DefaultRolloutPercentage: 40
              }
            }
          },
          { name: "Microsoft.Percentage", parameters: { Value: 25 } }
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

  // You can use the `isFeatureFlag` global method to check if the content type is featureFlagContentType ("application/vnd.microsoft.appconfig.ff+json;charset=utf-8")
  const newFeatureFlag = parseFeatureFlag(getResponse); // Converts the configurationsetting into featureflag
  // Modify the props
  for (const clientFilter of newFeatureFlag.value.conditions.clientFilters) {
    clientFilter.parameters = clientFilter.parameters ?? {};
    if (clientFilter.name === "Microsoft.Targeting") {
      console.log(
        `  targeting feature flag client filter => name: ${
          clientFilter.name
        },\n Audience: ${JSON.stringify(clientFilter.parameters["Audience"], null, 2)}`
      );
      const audience = clientFilter.parameters.Audience;
      typeof audience === "object" &&
        (clientFilter.parameters.Audience = {
          ...audience,
          DefaultRolloutPercentage: 85
        });
    } else if (clientFilter.name === "Microsoft.TimeWindow") {
      // clientFilter.parameters.End;
      // clientFilter.parameters.Start;
      console.log(
        `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${clientFilter.parameters.Start}`
      );
      clientFilter.parameters.Start = "Wed, 01 June 2021 13:59:59 GMT";
    } else if (clientFilter.name === "Microsoft.Percentage") {
      console.log(
        `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${clientFilter.parameters.Value}`
      );
      clientFilter.parameters.Value = 56;
    } else {
      console.log(`  name of the custom feature flag client filter => name : ${clientFilter.name}`);
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

  // You can use the `isFeatureFlag` global method to check if the content type is featureFlagContentType ("application/vnd.microsoft.appconfig.ff+json;charset=utf-8")
  const featureFlagAfterUpdate = parseFeatureFlag(getResponseAfterUpdate); // Converts the configurationsetting into featureflag
  const conditions = featureFlagAfterUpdate.value.conditions;
  for (const clientFilter of conditions.clientFilters) {
    clientFilter.parameters = clientFilter.parameters ?? {};
    if (clientFilter.name === "Microsoft.Targeting") {
      console.log(
        `  targeting feature flag client filter => name: ${
          clientFilter.name
        },\n Audience: ${JSON.stringify(clientFilter.parameters.Audience, null, 2)}`
      );
    } else if (clientFilter.name === "Microsoft.TimeWindow") {
      console.log(
        `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${clientFilter.parameters.Start}`
      );
    } else if (clientFilter.name === "Microsoft.Percentage") {
      console.log(
        `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${clientFilter.parameters.Value}`
      );
    } else {
      console.log(`  name of the custom feature flag client filter => name : ${clientFilter.name}`);
    }
  }
  await cleanupSampleValues([originalFeatureFlag.key], appConfigClient);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

/**
 * Returns the environment variable, throws an error if not defined.
 *
 * @export
 * @param {string} name
 */
export function getEnvVar(name: string) {
  const val = process.env[name];
  if (!val) {
    throw `Environment variable ${name} is not defined.`;
  }
  return val;
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
