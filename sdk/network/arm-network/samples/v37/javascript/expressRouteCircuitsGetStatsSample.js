// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the stats from an express route circuit in a resource group.
 *
 * @summary gets all the stats from an express route circuit in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitStats.json
 */
async function getExpressRouteCircuitTrafficStats() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.getStats("rg1", "circuitName");
  console.log(result);
}

async function main() {
  await getExpressRouteCircuitTrafficStats();
}

main().catch(console.error);
