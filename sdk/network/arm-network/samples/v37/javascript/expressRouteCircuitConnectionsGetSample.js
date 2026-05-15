// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary gets the specified Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitConnectionGet.json
 */
async function expressRouteCircuitConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitConnections.get(
    "rg1",
    "ExpressRouteARMCircuitA",
    "AzurePrivatePeering",
    "circuitConnectionUSAUS",
  );
  console.log(result);
}

async function main() {
  await expressRouteCircuitConnectionGet();
}

main().catch(console.error);
