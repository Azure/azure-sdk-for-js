// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all global reach connections associated with a private peering in an express route circuit.
 *
 * @summary Gets all global reach connections associated with a private peering in an express route circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitConnectionList.json
 */
async function listExpressRouteCircuitConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid1";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "ExpressRouteARMCircuitA";
  const peeringName = "AzurePrivatePeering";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCircuitConnections.list(
    resourceGroupName,
    circuitName,
    peeringName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listExpressRouteCircuitConnection();
}

main().catch(console.error);
