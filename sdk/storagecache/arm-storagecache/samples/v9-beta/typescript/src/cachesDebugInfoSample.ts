// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells a cache to write generate debug info for support to process.
 *
 * @summary tells a cache to write generate debug info for support to process.
 * x-ms-original-file: 2026-01-01/Caches_DebugInfo.json
 */
async function cachesDebugInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.debugInfo("scgroup", "sc");
}

async function main(): Promise<void> {
  await cachesDebugInfo();
}

main().catch(console.error);
