// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DiscoveredAssetEndpointProfile
 *
 * @summary get a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAssetEndpointProfile.json
 */
async function getDiscoveredAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.discoveredAssetEndpointProfiles.get(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
