// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DiscoveredAssetEndpointProfile resources by resource group
 *
 * @summary list DiscoveredAssetEndpointProfile resources by resource group
 * x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_ResourceGroup.json
 */
async function listDiscoveredAssetEndpointProfilesResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.discoveredAssetEndpointProfiles.listByResourceGroup(
    "myResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDiscoveredAssetEndpointProfilesResourceGroup();
}

main().catch(console.error);
