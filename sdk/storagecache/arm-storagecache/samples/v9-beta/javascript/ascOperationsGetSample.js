// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of an asynchronous operation for the Azure HPC Cache
 *
 * @summary gets the status of an asynchronous operation for the Azure HPC Cache
 * x-ms-original-file: 2026-01-01/AscOperations_Get.json
 */
async function ascOperationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.ascOperations.get("westus", "testoperationid");
  console.log(result);
}

async function main() {
  await ascOperationsGet();
}

main().catch(console.error);
