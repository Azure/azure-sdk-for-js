// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified express route circuit.
 *
 * @summary deletes the specified express route circuit.
 * x-ms-original-file: 2025-09-01/ExpressRouteCircuitDelete.json
 */
async function deleteExpressRouteCircuit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCircuits.delete("rg1", "circuitName");
}

/**
 * This sample demonstrates how to deletes the specified express route circuit.
 *
 * @summary deletes the specified express route circuit.
 * x-ms-original-file: 2025-09-01/ExpressRouteMultiCloudCircuitDelete.json
 */
async function deleteMultiCloudExpressRouteCircuit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCircuits.delete("rg1", "circuitName");
}

async function main() {
  await deleteExpressRouteCircuit();
  await deleteMultiCloudExpressRouteCircuit();
}

main().catch(console.error);
