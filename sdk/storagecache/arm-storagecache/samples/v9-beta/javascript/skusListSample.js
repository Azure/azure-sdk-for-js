// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of StorageCache.Cache SKUs available to this subscription.
 *
 * @summary get the list of StorageCache.Cache SKUs available to this subscription.
 * x-ms-original-file: 2026-01-01/Skus_List.json
 */
async function skusList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await skusList();
}

main().catch(console.error);
