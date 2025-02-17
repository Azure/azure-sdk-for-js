// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AssetEndpointProfile
 *
 * @summary get a AssetEndpointProfile
 * x-ms-original-file: 2024-11-01/Get_AssetEndpointProfile.json
 */
async function getAssetEndpointProfile() {
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
async function getAssetEndpointProfileWithSyncStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.assetEndpointProfiles.get(
    "myResourceGroup",
    "my-assetendpointprofile",
  );
  console.log(result);
}

async function main() {
  await getAssetEndpointProfile();
  getAssetEndpointProfileWithSyncStatus();
}

main().catch(console.error);
