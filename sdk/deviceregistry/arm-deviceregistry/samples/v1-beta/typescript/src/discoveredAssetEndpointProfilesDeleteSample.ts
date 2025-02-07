// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DiscoveredAssetEndpointProfile
 *
 * @summary delete a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAssetEndpointProfile.json
 */
async function deleteDiscoveredAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.discoveredAssetEndpointProfiles.delete(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
  );
}

async function main(): Promise<void> {
  deleteDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
