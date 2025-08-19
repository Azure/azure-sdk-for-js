// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified peering from the specified express route circuit.
 *
 * @summary Deletes the specified peering from the specified express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ExpressRouteCircuitPeeringDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteExpressRouteCircuitPeerings(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "circuitName";
  const peeringName = "peeringName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitPeerings.beginDeleteAndWait(
    resourceGroupName,
    circuitName,
    peeringName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteExpressRouteCircuitPeerings();
}

main().catch(console.error);
