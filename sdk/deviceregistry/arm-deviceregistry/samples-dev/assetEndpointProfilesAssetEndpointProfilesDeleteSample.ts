// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a AssetEndpointProfile
 *
 * @summary delete a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Delete_AssetEndpointProfile.json
 */

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.assetEndpointProfiles.delete("myResourceGroup", "my-assetendpointprofile");
}

async function main(): Promise<void> {
  await deleteAssetEndpointProfile();
}

main().catch(console.error);
