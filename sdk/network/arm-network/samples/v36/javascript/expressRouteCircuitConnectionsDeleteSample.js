// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary Deletes the specified Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitConnectionDelete.json
 */
async function deleteExpressRouteCircuit() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const connectionName = "circuitConnectionUSAUS";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuitConnections.beginDeleteAndWait(
    resourceGroupName,
    circuitName,
    peeringName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await deleteExpressRouteCircuit();
}

main().catch(console.error);
