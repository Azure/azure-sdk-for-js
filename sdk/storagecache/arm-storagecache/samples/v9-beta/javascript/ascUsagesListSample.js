// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the quantity used and quota limit for resources
 *
 * @summary gets the quantity used and quota limit for resources
 * x-ms-original-file: 2026-01-01/AscResourceUsages_Get.json
 */
async function ascUsagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ascUsages.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await ascUsagesList();
}

main().catch(console.error);
