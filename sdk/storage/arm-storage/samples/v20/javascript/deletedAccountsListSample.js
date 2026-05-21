// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists deleted accounts under the subscription.
 *
 * @summary lists deleted accounts under the subscription.
 * x-ms-original-file: 2025-08-01/DeletedAccountList.json
 */
async function deletedAccountList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedAccounts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await deletedAccountList();
}

main().catch(console.error);
