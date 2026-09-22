// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to schedules a cache for deletion.
 *
 * @summary schedules a cache for deletion.
 * x-ms-original-file: 2026-01-01/Caches_Delete.json
 */
async function cachesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.delete("scgroup", "sc");
}

async function main(): Promise<void> {
  await cachesDelete();
}

main().catch(console.error);
