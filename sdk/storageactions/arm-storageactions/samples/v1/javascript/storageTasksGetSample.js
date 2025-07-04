// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageActionsManagementClient } = require("@azure/arm-storageactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the storage task properties
 *
 * @summary get the storage task properties
 * x-ms-original-file: 2023-01-01/storageTasksCrud/GetStorageTask.json
 */
async function getStorageTask() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  const result = await client.storageTasks.get("res4228", "mytask1");
  console.log(result);
}

async function main() {
  await getStorageTask();
}

main().catch(console.error);
