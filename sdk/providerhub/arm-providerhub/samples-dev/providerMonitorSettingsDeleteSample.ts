// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a provider monitor setting.
 *
 * @summary deletes a provider monitor setting.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Delete.json
 */
async function providerMonitorSettingsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.providerMonitorSettings.delete("default", "ContosoMonitorSetting");
}

async function main(): Promise<void> {
  await providerMonitorSettingsDelete();
}

main().catch(console.error);
