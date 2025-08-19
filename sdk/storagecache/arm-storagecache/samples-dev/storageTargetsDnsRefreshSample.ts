// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Tells a storage target to refresh its DNS information.
 *
 * @summary Tells a storage target to refresh its DNS information.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2024-03-01/examples/StorageTargets_DnsRefresh.json
 */

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cachesDnsRefresh(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const cacheName = "sc";
  const storageTargetName = "st1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.storageTargets.beginDnsRefreshAndWait(
    resourceGroupName,
    cacheName,
    storageTargetName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cachesDnsRefresh();
}

main().catch(console.error);
