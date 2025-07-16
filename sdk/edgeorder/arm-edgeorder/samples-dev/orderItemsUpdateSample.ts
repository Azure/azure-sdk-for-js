// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderClient } from "@azure/arm-edgeorder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the properties of an existing order item.
 *
 * @summary update the properties of an existing order item.
 * x-ms-original-file: 2024-02-01/UpdateOrderItem.json
 */
async function updateOrderItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const result = await client.orderItems.update("YourResourceGroupName", "TestOrderItemName3", {
    properties: {
      preferences: {
        transportPreferences: { preferredShipmentType: "CustomerManaged" },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateOrderItem();
}

main().catch(console.error);
