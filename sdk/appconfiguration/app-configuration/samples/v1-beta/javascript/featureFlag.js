// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 */
const {
  AppConfigurationClient,
  featureFlagContentType,
  parseFeatureFlag,
} = require("@azure/app-configuration");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running featureFlag sample`);

  const originalFeatureFlag = {
    key: `sample-feature-flag`,
    isReadOnly: false,
    contentType: featureFlagContentType,
    value: {
      enabled: false,
      description: "I'm a description",
      conditions: {
        clientFilters: [
          // {
          // // Time window filter - Use this filter to activate the feature for a time period
          //   name: "Microsoft.TimeWindow",
          //   parameters: {
          //     Start: "Wed, 01 May 2021 13:59:59 GMT",
          //     End: "Mon, 01 July 2022 00:00:00 GMT"
          //   }
          // },
          {
            // Targeting filter - you can target users/groups of users using this filter
            name: "Microsoft.Targeting",
            parameters: {
              Audience: {
                Groups: [{ Name: "contoso.com", RolloutPercentage: 50 }],
                Users: ["test@contoso.com"],
                DefaultRolloutPercentage: 0, // The feature is always disabled for all other users, because the Default percentage is set to 0.
              },
              // You can create additional users with @contoso.com email addresses to see the behavior of the group settings. 50% of these users will see the Beta item. The other 50% won't see the Beta item.
            },
          },
          // {
          //   // Percentage filter - activates a feature based on a percentage, to enable the feature flag for 50% of requests
          //   name: "Microsoft.Percentage",
          //   parameters: { Value: 50 }
          // },
          // { name: "FilterX" }, // Custom filter
        ],
      },
    },
  };

  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const appConfigClient = new AppConfigurationClient(connectionString);

  await cleanupSampleValues([originalFeatureFlag.key], appConfigClient);

  console.log(`Add a new featureFlag with key: ${originalFeatureFlag.key}`);
  await appConfigClient.addConfigurationSetting(originalFeatureFlag);

  console.log(`Get the added configurationSetting with key: ${originalFeatureFlag.key}`);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key: originalFeatureFlag.key,
  });

  // You can use the `isFeatureFlag` global method to check if the content type is featureFlagContentType ("application/vnd.microsoft.appconfig.ff+json;charset=utf-8")
  const newFeatureFlag = parseFeatureFlag(getResponse); // Converts the configurationsetting into featureflag
  // Modify the props
  for (const clientFilter of newFeatureFlag.value.conditions.clientFilters) {
    clientFilter.parameters = clientFilter.parameters || {};
    console.log(
      `\n...clientFilter - "${clientFilter.name}"...\nparams => ${JSON.stringify(
        clientFilter.parameters,
        null,
        1
      )}\n`
    );
    switch (clientFilter.name) {
      // Tweak the client filters of the feature flag
      case "Microsoft.Targeting":
        // Adds a new user to the group
        if (isTargetingClientFilter(clientFilter)) {
          clientFilter.parameters.Audience.Users =
            clientFilter.parameters.Audience.Users.concat("test2@contoso.com");
        }
        break;
      // case "Microsoft.TimeWindow":
      // // Changes the start time
      //   clientFilter.parameters.Start = "Wed, 01 June 2021 13:59:59 GMT";
      //   break;
      // case "Microsoft.Percentage":
      // // Changes the percentage value from 50 to 75 - to enable the feature flag for 75% of requests
      //   clientFilter.parameters.Value = 75;
      //   break;
      default:
        // Change the filter name for all other client filters
        // clientFilter.name = "FilterY";
        break;
    }
  }

  console.log(`========> Update the featureFlag <======== `);
  // Updating the config setting
  await appConfigClient.setConfigurationSetting(newFeatureFlag);

  // Get the config setting again
  console.log(`Get the updated config setting with key: ${newFeatureFlag.key}`);
  const getResponseAfterUpdate = await appConfigClient.getConfigurationSetting({
    key: newFeatureFlag.key,
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
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

/**
 * typeguard - for targeting client filter
 */
function isTargetingClientFilter(clientFilter) {
  return (
    clientFilter.name === "Microsoft.Targeting" &&
    clientFilter.parameters &&
    clientFilter.parameters["Audience"] &&
    Array.isArray(clientFilter.parameters["Audience"]["Groups"]) &&
    Array.isArray(clientFilter.parameters["Audience"]["Users"]) &&
    typeof clientFilter.parameters["Audience"]["DefaultRolloutPercentage"] === "number"
  );
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});

module.exports = { main };
