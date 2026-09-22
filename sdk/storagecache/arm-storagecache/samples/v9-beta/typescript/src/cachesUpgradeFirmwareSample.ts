// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrade a cache's firmware if a new version is available. Otherwise, this operation has no effect.
 *
 * @summary upgrade a cache's firmware if a new version is available. Otherwise, this operation has no effect.
 * x-ms-original-file: 2026-01-01/Caches_UpgradeFirmware.json
 */
async function cachesUpgradeFirmware(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.upgradeFirmware("scgroup", "sc1");
}

async function main(): Promise<void> {
  await cachesUpgradeFirmware();
}

main().catch(console.error);
