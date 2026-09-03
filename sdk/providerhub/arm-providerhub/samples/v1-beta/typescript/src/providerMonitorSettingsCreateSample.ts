// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates the provider monitor setting.
 *
 * @summary creates the provider monitor setting.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Create.json
 */
async function providerMonitorSettingsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerMonitorSettings.create("default", "ContosoMonitorSetting", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await providerMonitorSettingsCreate();
}

main().catch(console.error);
