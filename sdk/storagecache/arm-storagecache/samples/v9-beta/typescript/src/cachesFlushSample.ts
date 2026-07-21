// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells a cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete.
 *
 * @summary tells a cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete.
 * x-ms-original-file: 2026-01-01/Caches_Flush.json
 */
async function cachesFlush(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.flush("scgroup", "sc");
}

async function main(): Promise<void> {
  await cachesFlush();
}

main().catch(console.error);
