// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the outbound routes configured for the Virtual Hub on a particular connection.
 *
 * @summary gets the outbound routes configured for the Virtual Hub on a particular connection.
 * x-ms-original-file: 2025-05-01/GetOutboundRoutes.json
 */
async function outboundRoutesForTheVirtualHubOnAParticularConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.getOutboundRoutes("rg1", "virtualHub1", {
    connectionType: "ExpressRouteConnection",
    resourceUri:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/expressRouteGateways/exrGw1/expressRouteConnections/exrConn1",
  });
  console.log(result);
}

async function main() {
  await outboundRoutesForTheVirtualHubOnAParticularConnection();
}

main().catch(console.error);
