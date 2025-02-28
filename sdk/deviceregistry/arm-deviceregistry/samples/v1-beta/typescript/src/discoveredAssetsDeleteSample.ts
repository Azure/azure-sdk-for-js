// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DiscoveredAsset
 *
 * @summary delete a DiscoveredAsset
 * x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAsset.json
 */
async function deleteDiscoveredAsset(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.discoveredAssets.delete("myResourceGroup", "my-discoveredasset");
}

async function main(): Promise<void> {
  deleteDiscoveredAsset();
}

main().catch(console.error);
