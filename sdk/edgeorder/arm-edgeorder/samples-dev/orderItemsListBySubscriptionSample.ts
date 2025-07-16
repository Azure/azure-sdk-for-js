// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderClient } from "@azure/arm-edgeorder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list order items at subscription level.
 *
 * @summary list order items at subscription level.
 * x-ms-original-file: 2024-02-01/ListOrderItemsAtSubscriptionLevel.json
 */
async function listOrderItemsAtSubscriptionLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.orderItems.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOrderItemsAtSubscriptionLevel();
}

main().catch(console.error);
