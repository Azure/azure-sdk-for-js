// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of Storage Targets for the specified cache.
 *
 * @summary returns a list of Storage Targets for the specified cache.
 * x-ms-original-file: 2026-01-01/StorageTargets_ListByCache.json
 */
async function storageTargetsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTargets.listByCache("scgroup", "sc1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageTargetsList();
}

main().catch(console.error);
