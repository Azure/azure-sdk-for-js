// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list BulkCreate resources by subscriptionId.
 *
 * @summary list BulkCreate resources by subscriptionId.
 * x-ms-original-file: 2026-10-16/BulkCreate_ListBySubscription.json
 */
async function listBulkCreateOperationsInASubscriptionAndRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreate.listBySubscription("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBulkCreateOperationsInASubscriptionAndRegion();
}

main().catch(console.error);
