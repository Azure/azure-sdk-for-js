// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified express route circuit.
 *
 * @summary gets information about the specified express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitGet.json
 */
async function getExpressRouteCircuit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.get("rg1", "circuitName");
  console.log(result);
}

async function main() {
  await getExpressRouteCircuit();
}

main().catch(console.error);
