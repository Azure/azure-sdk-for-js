// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Storage DataShares in a Storage Account.
 *
 * @summary list all Storage DataShares in a Storage Account.
 * x-ms-original-file: 2025-08-01/StorageDataShareCRUD/StorageDataShares_ListByStorageAccount.json
 */
async function listDataSharesByStorageAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataShares.listByStorageAccount("testrg", "teststorageaccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDataSharesByStorageAccount();
}

main().catch(console.error);
