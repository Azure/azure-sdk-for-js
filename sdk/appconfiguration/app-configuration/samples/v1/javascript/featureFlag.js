// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 */
const {
  AppConfigurationClient,
  featureFlagContentType,
  parseFeatureFlag
} = require("@azure/app-configuration");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log(`Running featureFlag sample`);

  const originalFeatureFlag = {
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
                  { Name: "group-1", RolloutPercentage: 25 },
                  { Name: "group-2", RolloutPercentage: 45 }
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
    console.log(
      `\n...clientFilter - "${clientFilter.name}"...\nparams => ${JSON.stringify(
        clientFilter.parameters,
        null,
        1
      )}\n`
    );
    switch (clientFilter.name) {
      case "Microsoft.Targeting":
        const audience = clientFilter.parameters.Audience;
        typeof audience === "object" &&
          (clientFilter.parameters.Audience = {
            ...audience,
            DefaultRolloutPercentage: 85
          });
        break;
      case "Microsoft.TimeWindow":
        clientFilter.parameters.Start = "Wed, 01 June 2021 13:59:59 GMT";
        break;
      case "Microsoft.Percentage":
        clientFilter.parameters.Value = 56;
        break;
      default:
        clientFilter.name = "FilterY";
        break;
    }
  }

  console.log(`========> Update the featureFlag <======== `);
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
    console.log(
      `\n...clientFilter - "${clientFilter.name}"...\nparams => ${JSON.stringify(
        clientFilter.parameters,
        null,
        1
      )}\n`
    );
  }
  await cleanupSampleValues([originalFeatureFlag.key], appConfigClient);
}

async function cleanupSampleValues(keys, client) {
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
export function getEnvVar(name) {
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
