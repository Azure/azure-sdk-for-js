// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 *
 */
const {
  AppConfigurationClient,
  featureFlagContentType,
  featureFlagPrefix,
  isFeatureFlag,
  isFeatureFlagClientFilter
} = require("@azure/app-configuration");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log(`Running featureFlag sample`);

  const featureFlag = {
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
    },
    enabled: false,
    isReadOnly: false,
    key: `${featureFlagPrefix}new-feature-flag-${Math.ceil(100 + Math.random() * 900)}`,
    contentType: featureFlagContentType,
    description: "I'm a description"
  };

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const appConfigClient = new AppConfigurationClient(connectionString);

  await cleanupSampleValues([featureFlag.key], appConfigClient);

  console.log(`Add a new featureFlag with key: ${featureFlag.key}`);
  await appConfigClient.addConfigurationSetting(featureFlag);

  console.log(`Get the added featureFlag with key: ${featureFlag.key}`);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key: featureFlag.key
  });

  if (isFeatureFlag(getResponse)) {
    // isFeatureFlag() check for type inference to narrow down the configuration setting as a FeatureFlag
    // setting is a `FeatureFlag`
    const conditions = getResponse.conditions;

    // the client filters are the real meat of the FeatureFlag.
    //
    for (const clientFilter of conditions.clientFilters) {
      if (isFeatureFlagClientFilter("targeting", clientFilter)) {
        // some of the fields:
        // clientFilter.parameters.audience
        // clientFilter.parameters.audience.groups[0].name
        // clientFilter.parameters.audience.groups[0].rolloutPercentage
        // clientFilter.parameters.audience.users[0]         // string
        // clientFilter.parameters.audience.defaultRolloutPercentage
        console.log(
          `  targeting feature flag client filter => name: ${clientFilter.name}, defaultRolloutPercentage: ${clientFilter.parameters.audience.defaultRolloutPercentage}`
        );
        clientFilter.parameters.audience.defaultRolloutPercentage = 85;
      } else if (isFeatureFlagClientFilter("timeWindow", clientFilter)) {
        // clientFilter.parameters.end;
        // clientFilter.parameters.start;
        console.log(
          `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${clientFilter.parameters.start}`
        );
        clientFilter.parameters.start = "Wed, 01 June 2021 13:59:59 GMT";
      } else if (isFeatureFlagClientFilter("percentage", clientFilter)) {
        console.log(
          `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${clientFilter.parameters.value}`
        );
        clientFilter.parameters.value = 56;
      } else {
        console.log(
          `  name of the custom feature flag client filter => name : ${clientFilter.name}`
        );
        clientFilter.name = "FilterY";
      }
    }
  }

  console.log(`===> Update the featureFlag`);
  await appConfigClient.setConfigurationSetting(getResponse);
  const getResponseAfterUpdate = await appConfigClient.getConfigurationSetting({
    key: featureFlag.key
  });
  console.log(`Get the updated featureFlag with key: ${featureFlag.key}`);

  if (isFeatureFlag(getResponseAfterUpdate)) {
    const conditions = getResponseAfterUpdate.conditions;
    for (const clientFilter of conditions.clientFilters) {
      if (isFeatureFlagClientFilter("targeting", clientFilter)) {
        console.log(
          `  targeting feature flag client filter => name: ${clientFilter.name}, defaultRolloutPercentage: ${clientFilter.parameters.audience.defaultRolloutPercentage}`
        );
      } else if (isFeatureFlagClientFilter("timeWindow", clientFilter)) {
        console.log(
          `  timeWindow feature flag client filter => name: ${clientFilter.name}, start time: ${clientFilter.parameters.start}`
        );
      } else if (isFeatureFlagClientFilter("percentage", clientFilter)) {
        console.log(
          `  percentage feature flag client filter => name: ${clientFilter.name}, value: ${clientFilter.parameters.value}`
        );
      } else {
        console.log(
          `  name of the custom feature flag client filter => name : ${clientFilter.name}`
        );
      }
    }
  }
  await cleanupSampleValues([featureFlag.key], appConfigClient);
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
