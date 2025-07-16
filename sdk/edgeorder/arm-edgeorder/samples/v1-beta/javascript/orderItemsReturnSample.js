// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return order item.
 *
 * @summary return order item.
 * x-ms-original-file: 2024-02-01/ReturnOrderItem.json
 */
async function returnOrderItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const result = await client.orderItems.return("YourResourceGroupName", "TestOrderName4", {
    returnReason: "Order returned",
  });
  console.log(result);
}

async function main() {
  await returnOrderItem();
}

main().catch(console.error);
