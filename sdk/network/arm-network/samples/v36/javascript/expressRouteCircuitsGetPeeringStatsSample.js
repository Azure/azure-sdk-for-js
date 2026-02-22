// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all stats from an express route circuit in a resource group.
 *
 * @summary Gets all stats from an express route circuit in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitPeeringStats.json
 */
async function getExpressRouteCircuitPeeringTrafficStats() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "circuitName";
  const peeringName = "peeringName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.getPeeringStats(
    resourceGroupName,
    circuitName,
    peeringName,
  );
  console.log(result);
}

async function main() {
  await getExpressRouteCircuitPeeringTrafficStats();
}

main().catch(console.error);
