// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AssetEndpointProfile
 *
 * @summary delete a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Delete_AssetEndpointProfile.json
 */
async function deleteAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.assetEndpointProfiles.AssetEndpointProfiles_delete(
    "myResourceGroup",
    "my-assetendpointprofile",
  );
}

async function main(): Promise<void> {
  await deleteAssetEndpointProfile();
}

main().catch(console.error);
