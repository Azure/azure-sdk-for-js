// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all stats from an express route circuit in a resource group.
 *
 * @summary gets all stats from an express route circuit in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitPeeringStats.json
 */
async function getExpressRouteCircuitPeeringTrafficStats(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.getPeeringStats(
    "rg1",
    "circuitName",
    "peeringName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteCircuitPeeringTrafficStats();
}

main().catch(console.error);
