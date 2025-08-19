// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Tells a Stopped state cache to transition to Active state.
 *
 * @summary Tells a Stopped state cache to transition to Active state.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2024-03-01/examples/Caches_Start.json
 */

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cachesStart(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const cacheName = "sc";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.beginStartAndWait(resourceGroupName, cacheName);
  console.log(result);
}

async function main(): Promise<void> {
  await cachesStart();
}

main().catch(console.error);
