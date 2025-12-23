// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDiscoveryClient } from "@azure/arm-storagediscovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StorageDiscoveryWorkspace resources by resource group
 *
 * @summary list StorageDiscoveryWorkspace resources by resource group
 * x-ms-original-file: 2025-09-01/StorageDiscoveryWorkspaces_ListByResourceGroup.json
 */
async function listStorageDiscoveryWorkspacesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageDiscoveryWorkspaces.listByResourceGroup("sample-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageDiscoveryWorkspacesByResourceGroup();
}

main().catch(console.error);
