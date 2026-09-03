// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the provider monitor setting details.
 *
 * @summary gets the provider monitor setting details.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_Get.json
 */
async function providerMonitorSettingsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerMonitorSettings.get("default", "ContosoMonitorSetting");
  console.log(result);
}

async function main(): Promise<void> {
  await providerMonitorSettingsGet();
}

main().catch(console.error);
