// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified express route circuit.
 *
 * @summary deletes the specified express route circuit.
 * x-ms-original-file: 2025-09-01/ExpressRouteCircuitDelete.json
 */
async function deleteExpressRouteCircuit(): Promise<void> {
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
async function deleteMultiCloudExpressRouteCircuit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCircuits.delete("rg1", "circuitName");
}

async function main(): Promise<void> {
  await deleteExpressRouteCircuit();
  await deleteMultiCloudExpressRouteCircuit();
}

main().catch(console.error);
