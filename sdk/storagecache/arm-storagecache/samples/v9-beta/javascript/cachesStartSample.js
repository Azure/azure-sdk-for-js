// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to tells a Stopped state cache to transition to Active state.
 *
 * @summary tells a Stopped state cache to transition to Active state.
 * x-ms-original-file: 2026-01-01/Caches_Start.json
 */
async function cachesStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.start("scgroup", "sc");
}

async function main() {
  await cachesStart();
}

main().catch(console.error);
