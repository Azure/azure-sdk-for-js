// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes.
 *
 * @summary tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes.
 * x-ms-original-file: 2026-01-01/StorageTargets_Flush.json
 */
async function storageTargetsFlush(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.storageTarget.flush("scgroup", "sc", "st1");
}

async function main(): Promise<void> {
  await storageTargetsFlush();
}

main().catch(console.error);
