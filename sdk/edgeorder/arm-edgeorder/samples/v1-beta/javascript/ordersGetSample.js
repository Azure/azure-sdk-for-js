// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an order.
 *
 * @summary get an order.
 * x-ms-original-file: 2024-02-01/GetOrderByName.json
 */
async function getOrderByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const result = await client.orders.get("YourResourceGroupName", "eastus", "TestOrderName3");
  console.log(result);
}

async function main() {
  await getOrderByName();
}

main().catch(console.error);
