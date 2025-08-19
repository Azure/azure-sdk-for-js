// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a AssetEndpointProfile
 *
 * @summary get a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Get_AssetEndpointProfile.json
 */

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

async function getAssetEndpointProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.get(
    "myResourceGroup",
    "my-assetendpointprofile",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AssetEndpointProfile
 *
 * @summary get a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Get_AssetEndpointProfile_With_SyncStatus.json
 */
async function getAssetEndpointProfileWithSyncStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.get(
    "myResourceGroup",
    "my-assetendpointprofile",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAssetEndpointProfile();
  getAssetEndpointProfileWithSyncStatus();
}

main().catch(console.error);
