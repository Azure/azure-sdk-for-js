// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all global reach connections associated with a private peering in an express route circuit.
 *
 * @summary gets all global reach connections associated with a private peering in an express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitConnectionList.json
 */
async function listExpressRouteCircuitConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCircuitConnections.list(
    "rg1",
    "ExpressRouteARMCircuitA",
    "AzurePrivatePeering",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressRouteCircuitConnection();
}

main().catch(console.error);
