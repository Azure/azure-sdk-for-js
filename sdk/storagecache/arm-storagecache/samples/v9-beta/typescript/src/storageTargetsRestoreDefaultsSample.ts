// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells a storage target to restore its settings to their default values.
 *
 * @summary tells a storage target to restore its settings to their default values.
 * x-ms-original-file: 2026-01-01/StorageTargets_RestoreDefaults.json
 */
async function storageTargetsRestoreDefaults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.storageTargets.restoreDefaults("scgroup", "sc", "st1");
}

async function main(): Promise<void> {
  await storageTargetsRestoreDefaults();
}

main().catch(console.error);
