// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 *
 * @summary Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PeerExpressRouteCircuitConnectionGet.json
 */
async function peerExpressRouteCircuitConnectionGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid1";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const connectionName = "60aee347-e889-4a42-8c1b-0aae8b1e4013";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.peerExpressRouteCircuitConnections.get(
    resourceGroupName,
    circuitName,
    peeringName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await peerExpressRouteCircuitConnectionGet();
}

main().catch(console.error);
