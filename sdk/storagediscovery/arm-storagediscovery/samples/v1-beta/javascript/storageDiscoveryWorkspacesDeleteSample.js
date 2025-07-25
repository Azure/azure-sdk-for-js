// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageDiscoveryClient } = require("@azure/arm-storagediscovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a StorageDiscoveryWorkspace
 *
 * @summary delete a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-06-01-preview/StorageDiscoveryWorkspaces_Delete.json
 */
async function deleteAStorageDiscoveryWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  await client.storageDiscoveryWorkspaces.delete("sample-rg", "sampleworkspace");
}

async function main() {
  await deleteAStorageDiscoveryWorkspace();
}

main().catch(console.error);
