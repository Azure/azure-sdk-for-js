// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of rack SKUs in the provided subscription.
 *
 * @summary get a list of rack SKUs in the provided subscription.
 * x-ms-original-file: 2026-05-01-preview/RackSkus_ListBySubscription.json
 */
async function listRackSKUsForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.rackSkus.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRackSKUsForSubscription();
}

main().catch(console.error);
