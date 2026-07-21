// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a Storage Target from a cache.
 *
 * @summary returns a Storage Target from a cache.
 * x-ms-original-file: 2026-01-01/StorageTargets_Get.json
 */
async function storageTargetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.storageTargets.get("scgroup", "sc1", "st1");
  console.log(result);
}

async function main(): Promise<void> {
  await storageTargetsGet();
}

main().catch(console.error);
