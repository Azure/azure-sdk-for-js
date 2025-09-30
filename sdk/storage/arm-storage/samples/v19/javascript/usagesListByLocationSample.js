// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the current usage count and the limit for the resources of the location under the subscription.
 *
 * @summary Gets the current usage count and the limit for the resources of the location under the subscription.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountListLocationUsage.json
 */
async function usageList() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "eastus2(stage)";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByLocation(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await usageList();
}

main().catch(console.error);
