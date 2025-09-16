// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Feature flags are settings that follow specific JSON schema for the value.
 */
const {
  AppConfigurationClient,
  featureFlagContentType,
  parseFeatureFlag,
  featureFlagPrefix
} = require("@azure/app-configuration");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running featureFlag sample`);

  const featureFlagName = "sample-feature-flag";
  const sampleFeatureFlag = {
    key: `${featureFlagPrefix}${featureFlagName}`,
    isReadOnly: false,
    contentType: featureFlagContentType,
    value: {
      enabled: false,
      description: "I'm a description",
      conditions: {
        clientFilters: [
          {
            // Targeting filter - you can target users/groups of users using this filter
            name: "Microsoft.Targeting",
            parameters: {
              Audience: {
                Groups: [{ Name: "contoso.com", RolloutPercentage: 50 }], // The feature flag is enabled for 50% of other users in the contoso.com group, because contoso.com is listed in the Groups section with a Percentage of 50.
                Users: ["test@contoso.com"], // The feature flag is always enabled for user test@contoso.com, because test@contoso.com is listed in the Users section.
                DefaultRolloutPercentage: 0, // The feature is always disabled for all other users, because the Default percentage is set to 0.
              },
              // You can create additional users with @contoso.com email addresses to see the behavior of the group settings. 50% of these users will see the Beta item. The other 50% won't see the Beta item.
            },
          },
          // {
          //   // Time window filter - Use this filter to activate the feature for a time period
          //   name: "Microsoft.TimeWindow",
          //   parameters: {
          //     Start: new Date().toUTCString(),
          //     End: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(), // 30 days from now
          //   },
          // },
          // { name: "FilterX" }, // Custom filter
        ],
      },
    },
  };

  // Set the following environment variable or edit the value on the following line.
  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";
  const credential = new DefaultAzureCredential();
  const appConfigClient = new AppConfigurationClient(endpoint, credential);

  await cleanupSampleValues([sampleFeatureFlag.key], appConfigClient);

  console.log(`Add a new featureFlag with key: ${sampleFeatureFlag.key}`);
  await appConfigClient.addConfigurationSetting(sampleFeatureFlag);

  console.log(`Use configuration provider to load feature flags and enable dynamic refresh`);
  const appConfigProvider = await load(endpoint, credential, {
    featureFlagOptions: {
      enabled: true,
      refresh: {
        enabled: true,
        // refreshIntervalInMs: 30_000, // Optional. Default: 30 seconds
      }
    }
  });

  console.log(`Use feature management library to consume feature flags`);
  const featureManager = new FeatureManager(
    new ConfigurationMapFeatureFlagProvider(appConfigProvider));

  let isEnabled = await featureManager.isEnabled(featureFlagName);
  console.log(`Is featureFlag enabled? ${isEnabled}`);

  const targetingContext: ITargetingContext = { userId: "test@contoso.com" };
  isEnabled = await featureManager.isEnabled(featureFlagName, targetingContext);
  console.log(`Is featureFlag enabled for test@contoso.com? ${isEnabled}`);

  console.log(`========> Update the featureFlag <======== `);

  // Update the feature flag to be enabled
  sampleFeatureFlag.value.enabled = true;

  // Updating the config setting
  await appConfigClient.setConfigurationSetting(sampleFeatureFlag);

  while (!isEnabled) {
    console.log("Waiting for feature flag to be refreshed...");
    // Waiting for refresh interval to elapse
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    await appConfigProvider.refresh();

    // The feature flag will not be enabled for everyone as targeting filter is configured
    isEnabled = await featureManager.isEnabled(featureFlagName);
    console.log(`Is featureFlag enabled? ${isEnabled}`);
    
    isEnabled = await featureManager.isEnabled(featureFlagName, targetingContext);
    console.log(`Is featureFlag enabled for test@contoso.com? ${isEnabled}`);
  }

  await cleanupSampleValues([sampleFeatureFlag.key], appConfigClient);
}

async function cleanupSampleValues(keys, client) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});

module.exports = { main, isTimeWindowClientFilter };
