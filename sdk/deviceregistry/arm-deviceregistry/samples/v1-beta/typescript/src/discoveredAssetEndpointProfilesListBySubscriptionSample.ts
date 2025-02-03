// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DiscoveredAssetEndpointProfile resources by subscription ID
 *
 * @summary list DiscoveredAssetEndpointProfile resources by subscription ID
 * x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_Subscription.json
 */
async function listDiscoveredAssetEndpointProfilesSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.discoveredAssetEndpointProfiles.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  listDiscoveredAssetEndpointProfilesSubscription();
}

main().catch(console.error);
