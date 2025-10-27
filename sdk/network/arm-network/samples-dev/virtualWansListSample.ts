// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the VirtualWANs in a subscription.
 *
 * @summary Lists all the VirtualWANs in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-10-01/examples/VirtualWANList.json
 */
async function virtualWanList(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualWans.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualWanList();
}

main().catch(console.error);
