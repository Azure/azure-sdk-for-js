// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DiscoveredAsset
 *
 * @summary delete a DiscoveredAsset
 * x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAsset.json
 */
async function deleteDiscoveredAsset() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.discoveredAssets.delete("myResourceGroup", "my-discoveredasset");
}

async function main() {
  deleteDiscoveredAsset();
}

main().catch(console.error);
