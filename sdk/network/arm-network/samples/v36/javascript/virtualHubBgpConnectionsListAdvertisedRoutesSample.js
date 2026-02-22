// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 *
 * @summary Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualRouterPeerListAdvertisedRoute.json
 */
async function virtualRouterPeerListAdvertisedRoutes() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const hubName = "virtualRouter1";
  const connectionName = "peer1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnections.beginListAdvertisedRoutesAndWait(
    resourceGroupName,
    hubName,
    connectionName,
  );
  console.log(result);
}

async function main() {
  await virtualRouterPeerListAdvertisedRoutes();
}

main().catch(console.error);
