// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to tells an Active cache to transition to Stopped state.
 *
 * @summary tells an Active cache to transition to Stopped state.
 * x-ms-original-file: 2026-01-01/Caches_Stop.json
 */
async function cachesStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.stop("scgroup", "sc");
}

async function main() {
  await cachesStop();
}

main().catch(console.error);
