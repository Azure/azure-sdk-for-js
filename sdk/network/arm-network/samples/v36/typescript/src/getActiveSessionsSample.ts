// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the list of currently active sessions on the Bastion.
 *
 * @summary Returns the list of currently active sessions on the Bastion.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/BastionSessionsList.json
 */
async function returnsAListOfCurrentlyActiveSessionsOnTheBastion(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const bastionHostName = "bastionhosttenant";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.beginListActiveSessionsAndWait(
    resourceGroupName,
    bastionHostName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await returnsAListOfCurrentlyActiveSessionsOnTheBastion();
}

main().catch(console.error);
