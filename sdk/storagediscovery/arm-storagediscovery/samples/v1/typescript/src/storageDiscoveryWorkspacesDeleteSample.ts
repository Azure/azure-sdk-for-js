// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDiscoveryClient } from "@azure/arm-storagediscovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a StorageDiscoveryWorkspace
 *
 * @summary delete a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-09-01/StorageDiscoveryWorkspaces_Delete.json
 */
async function deleteAStorageDiscoveryWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  await client.storageDiscoveryWorkspaces.delete("sample-rg", "sampleworkspace");
}

async function main(): Promise<void> {
  await deleteAStorageDiscoveryWorkspace();
}

main().catch(console.error);
