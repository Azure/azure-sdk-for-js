// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to tells a Stopped state cache to transition to Active state.
 *
 * @summary tells a Stopped state cache to transition to Active state.
 * x-ms-original-file: 2026-01-01/Caches_Start.json
 */
async function cachesStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.start("scgroup", "sc");
}

async function main(): Promise<void> {
  await cachesStart();
}

main().catch(console.error);
