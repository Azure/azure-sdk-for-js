// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request.
 *
 * @summary invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request.
 * x-ms-original-file: 2026-01-01/StorageTargets_Invalidate.json
 */
async function storageTargetsInvalidate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.storageTarget.invalidate("scgroup", "sc", "st1");
}

async function main(): Promise<void> {
  await storageTargetsInvalidate();
}

main().catch(console.error);
