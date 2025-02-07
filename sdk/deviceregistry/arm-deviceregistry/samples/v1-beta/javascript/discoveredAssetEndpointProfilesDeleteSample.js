// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DiscoveredAssetEndpointProfile
 *
 * @summary delete a DiscoveredAssetEndpointProfile
 * x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAssetEndpointProfile.json
 */
async function deleteDiscoveredAssetEndpointProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.discoveredAssetEndpointProfiles.delete(
    "myResourceGroup",
    "my-discoveredassetendpointprofile",
  );
}

async function main() {
  deleteDiscoveredAssetEndpointProfile();
}

main().catch(console.error);
