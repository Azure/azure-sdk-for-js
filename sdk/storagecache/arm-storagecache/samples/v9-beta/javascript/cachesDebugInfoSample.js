// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to tells a cache to write generate debug info for support to process.
 *
 * @summary tells a cache to write generate debug info for support to process.
 * x-ms-original-file: 2026-01-01/Caches_DebugInfo.json
 */
async function cachesDebugInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.debugInfo("scgroup", "sc");
}

async function main() {
  await cachesDebugInfo();
}

main().catch(console.error);
