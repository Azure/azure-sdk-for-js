// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedules a cache for deletion.
 *
 * @summary schedules a cache for deletion.
 * x-ms-original-file: 2026-01-01/Caches_Delete.json
 */
async function cachesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.delete("scgroup", "sc");
}

async function main() {
  await cachesDelete();
}

main().catch(console.error);
