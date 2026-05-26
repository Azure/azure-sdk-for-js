// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the blob inventory policy associated with the specified storage account.
 *
 * @summary gets the blob inventory policy associated with the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountListBlobInventoryPolicy.json
 */
async function storageAccountGetBlobInventoryPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobInventoryPolicies.list("res7687", "sto9699")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageAccountGetBlobInventoryPolicy();
}

main().catch(console.error);
