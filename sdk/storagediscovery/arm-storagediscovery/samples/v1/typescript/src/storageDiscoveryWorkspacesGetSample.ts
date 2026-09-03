// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDiscoveryClient } from "@azure/arm-storagediscovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StorageDiscoveryWorkspace
 *
 * @summary get a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-09-01/StorageDiscoveryWorkspaces_Get.json
 */
async function getAStorageDiscoveryWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  const result = await client.storageDiscoveryWorkspaces.get(
    "sample-rg",
    "Sample-Storage-Workspace",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAStorageDiscoveryWorkspace();
}

main().catch(console.error);
