// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary Gets the specified Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitConnectionGet.json
 */
async function expressRouteCircuitConnectionGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid1";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const connectionName = "circuitConnectionUSAUS";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitConnections.get(
    resourceGroupName,
    circuitName,
    peeringName,
    connectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteCircuitConnectionGet();
}

main().catch(console.error);
