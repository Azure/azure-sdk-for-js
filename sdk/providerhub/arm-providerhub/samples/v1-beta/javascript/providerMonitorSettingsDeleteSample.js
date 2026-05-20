// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a provider monitor setting.
 *
 * @summary deletes a provider monitor setting.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Delete.json
 */
async function providerMonitorSettingsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.providerMonitorSettings.delete("default", "ContosoMonitorSetting");
}

async function main() {
  await providerMonitorSettingsDelete();
}

main().catch(console.error);
