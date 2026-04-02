// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the currently advertised ARP table associated with the express route cross connection in a resource group.
 *
 * @summary gets the currently advertised ARP table associated with the express route cross connection in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionsArpTable.json
 */
async function getExpressRouteCrossConnectionsArpTable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.listArpTable(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
    "primary",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCrossConnectionsArpTable();
}

main().catch(console.error);
