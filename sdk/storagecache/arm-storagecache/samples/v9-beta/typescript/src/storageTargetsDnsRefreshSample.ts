// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells a storage target to refresh its DNS information.
 *
 * @summary tells a storage target to refresh its DNS information.
 * x-ms-original-file: 2026-01-01/StorageTargets_DnsRefresh.json
 */
async function cachesDnsRefresh(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.storageTargets.dnsRefresh("scgroup", "sc", "st1");
}

async function main(): Promise<void> {
  await cachesDnsRefresh();
}

main().catch(console.error);
