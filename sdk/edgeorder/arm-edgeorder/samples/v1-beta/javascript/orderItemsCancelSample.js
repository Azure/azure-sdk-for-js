// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeOrderClient } = require("@azure/arm-edgeorder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel order item.
 *
 * @summary cancel order item.
 * x-ms-original-file: 2024-02-01/CancelOrderItem.json
 */
async function cancelOrderItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  await client.orderItems.cancel("YourResourceGroupName", "TestOrderItemName3", {
    reason: "Order cancelled",
  });
}

async function main() {
  await cancelOrderItem();
}

main().catch(console.error);
