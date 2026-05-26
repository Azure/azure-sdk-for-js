// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current usage count and the limit for the resources of the location under the subscription.
 *
 * @summary gets the current usage count and the limit for the resources of the location under the subscription.
 * x-ms-original-file: 2025-08-01/StorageAccountListLocationUsage.json
 */
async function usageList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByLocation("eastus2(stage)")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usageList();
}

main().catch(console.error);
