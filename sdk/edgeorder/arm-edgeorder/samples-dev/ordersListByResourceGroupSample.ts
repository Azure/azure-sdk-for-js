// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderClient } from "@azure/arm-edgeorder";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list orders at resource group level.
 *
 * @summary list orders at resource group level.
 * x-ms-original-file: 2024-02-01/ListOrderAtResourceGroupLevel.json
 */
async function listOrderAtResourceGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "eb5dc900-6186-49d8-b7d7-febd866fdc1d";
  const client = new EdgeOrderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.orders.listByResourceGroup("YourResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOrderAtResourceGroupLevel();
}

main().catch(console.error);
