// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the provider monitor setting properties as specified in the request body. Update fails if the specified provider monitor setting does not already exist.
 *
 * @summary updates the provider monitor setting properties as specified in the request body. Update fails if the specified provider monitor setting does not already exist.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Update.json
 */
async function providerMonitorSettingsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerMonitorSettings.update("default", "ContosoMonitorSetting");
  console.log(result);
}

async function main() {
  await providerMonitorSettingsUpdate();
}

main().catch(console.error);
