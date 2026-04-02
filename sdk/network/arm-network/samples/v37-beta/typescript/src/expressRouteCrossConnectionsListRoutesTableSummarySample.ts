// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the route table summary associated with the express route cross connection in a resource group.
 *
 * @summary gets the route table summary associated with the express route cross connection in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionsRouteTableSummary.json
 */
async function getExpressRouteCrossConnectionsRouteTableSummary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnections.listRoutesTableSummary(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
    "primary",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCrossConnectionsRouteTableSummary();
}

main().catch(console.error);
