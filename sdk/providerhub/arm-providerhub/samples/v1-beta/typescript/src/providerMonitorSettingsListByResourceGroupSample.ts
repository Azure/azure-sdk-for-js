// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of the provider monitor settings in the resource group.
 *
 * @summary gets the list of the provider monitor settings in the resource group.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_ListByResourceGroup.json
 */
async function providerMonitorSettingsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.providerMonitorSettings.listByResourceGroup("default")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await providerMonitorSettingsListByResourceGroup();
}

main().catch(console.error);
