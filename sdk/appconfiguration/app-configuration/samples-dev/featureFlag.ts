// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 *
 * @azsdk-weight 20
 */
import { AppConfigurationClient, FeatureFlag, FeatureFlagHelper } from "@azure/app-configuration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running featureFlag sample`);

  const originalFeatureFlag: FeatureFlag = {
    key: `new-feature-flag-${Math.ceil(100 + Math.random() * 900)}`,
    isReadOnly: false,
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

  const configurationSetting = FeatureFlagHelper.toConfigurationSetting(originalFeatureFlag);
  console.log(`Add a new configurationSetting with key: ${configurationSetting.key}`);
  await appConfigClient.addConfigurationSetting(configurationSetting);

  console.log(`Get the added configurationSetting with key: ${configurationSetting.key}`);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key: configurationSetting.key
  });
  const newFeatureFlag = FeatureFlagHelper.fromConfigurationSetting(getResponse); // Converts the configurationsetting into featureflag
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
        `  targeting feature flag client filter => name: ${clientFilter.name}, audience: ${
          clientFilter.parameters!.audience
        }`
      );
      clientFilter.parameters = {
        ...clientFilter.parameters,
        audience: { defaultRolloutPercentage: 85 }
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
      console.log(`  name of the custom feature flag client filter => name : ${clientFilter.name}`);
      clientFilter.name = "FilterY";
    }
  }

  console.log(`===> Update the featureFlag`);
  // Updating the config setting
  const newConfigurationSetting = FeatureFlagHelper.toConfigurationSetting(newFeatureFlag);
  await appConfigClient.setConfigurationSetting(newConfigurationSetting);

  // Get the config setting again
  console.log(`Get the updated config setting with key: ${newConfigurationSetting.key}`);
  const getResponseAfterUpdate = await appConfigClient.getConfigurationSetting({
    key: newConfigurationSetting.key
  });
  const featureFlagAfterUpdate = FeatureFlagHelper.fromConfigurationSetting(getResponseAfterUpdate); // Converts the configurationsetting into featureflag
  const conditions = featureFlagAfterUpdate.value.conditions;
  for (const clientFilter of conditions.clientFilters) {
    if (clientFilter.name === "Microsoft.Targeting") {
      console.log(
        `  targeting feature flag client filter => name: ${clientFilter.name}, audience: ${
          clientFilter.parameters!.audience
        }`
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
