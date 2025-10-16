// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the storage accounts available under the subscription. Note that storage keys are not returned; use the ListKeys operation for this.
 *
 * @summary Lists all the storage accounts available under the subscription. Note that storage keys are not returned; use the ListKeys operation for this.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountList.json
 */
async function storageAccountList() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAccounts.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await storageAccountList();
}

main().catch(console.error);
