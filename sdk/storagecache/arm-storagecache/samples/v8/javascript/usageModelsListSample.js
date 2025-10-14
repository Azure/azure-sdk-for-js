// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the list of cache usage models available to this subscription.
 *
 * @summary Get the list of cache usage models available to this subscription.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/UsageModels_List.json
 */
async function usageModelsList() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageModels.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await usageModelsList();
}

main().catch(console.error);
