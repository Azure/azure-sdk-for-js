// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the blob inventory policy associated with the specified storage account.
 *
 * @summary deletes the blob inventory policy associated with the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountDeleteBlobInventoryPolicy.json
 */
async function storageAccountDeleteBlobInventoryPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.blobInventoryPolicies.delete("res6977", "sto2527", "default");
}

async function main() {
  await storageAccountDeleteBlobInventoryPolicy();
}

main().catch(console.error);
