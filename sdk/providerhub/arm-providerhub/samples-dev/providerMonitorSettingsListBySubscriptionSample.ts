// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of the provider monitor settings in the subscription.
 *
 * @summary gets the list of the provider monitor settings in the subscription.
 * x-ms-original-file: 2024-09-01/ProviderMonitorSettings_ListBySubscription.json
 */
async function providerMonitorSettingsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.providerMonitorSettings.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await providerMonitorSettingsListBySubscription();
}

main().catch(console.error);
