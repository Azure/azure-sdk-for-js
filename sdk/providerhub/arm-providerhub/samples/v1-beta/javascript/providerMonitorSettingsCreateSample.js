// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the provider monitor setting.
 *
 * @summary creates the provider monitor setting.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Create.json
 */
async function providerMonitorSettingsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerMonitorSettings.create("default", "ContosoMonitorSetting", {
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await providerMonitorSettingsCreate();
}

main().catch(console.error);
