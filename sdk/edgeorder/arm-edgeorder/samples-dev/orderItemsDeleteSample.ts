// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderClient } from "@azure/arm-edgeorder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an order item.
 *
 * @summary delete an order item.
 * x-ms-original-file: 2024-02-01/DeleteOrderItemByName.json
 */
async function deleteOrderItemByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  await client.orderItems.delete("YourResourceGroupName", "TestOrderItemName3");
}

async function main(): Promise<void> {
  await deleteOrderItemByName();
}

main().catch(console.error);
