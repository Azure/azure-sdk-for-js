// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of all RoutingIntent child resources of the VirtualHub.
 *
 * @summary retrieves the details of all RoutingIntent child resources of the VirtualHub.
 * x-ms-original-file: 2025-05-01/RoutingIntentList.json
 */
async function routingIntentList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routingIntent.list("rg1", "virtualHub1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await routingIntentList();
}

main().catch(console.error);
