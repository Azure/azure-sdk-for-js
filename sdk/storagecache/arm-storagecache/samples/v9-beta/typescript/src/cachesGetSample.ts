// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a cache.
 *
 * @summary returns a cache.
 * x-ms-original-file: 2026-01-01/Caches_Get.json
 */
async function cachesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.get("scgroup", "sc1");
  console.log(result);
}

async function main(): Promise<void> {
  await cachesGet();
}

main().catch(console.error);
