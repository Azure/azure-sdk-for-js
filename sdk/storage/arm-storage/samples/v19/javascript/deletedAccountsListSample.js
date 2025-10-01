// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists deleted accounts under the subscription.
 *
 * @summary Lists deleted accounts under the subscription.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/DeletedAccountList.json
 */
async function deletedAccountList() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
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
