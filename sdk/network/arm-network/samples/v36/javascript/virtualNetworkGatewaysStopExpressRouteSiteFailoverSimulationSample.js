// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This operation stops failover simulation on the gateway for the specified peering location
 *
 * @summary This operation stops failover simulation on the gateway for the specified peering location
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayStopSiteFailoverSimulation.json
 */
async function virtualNetworkGatewayStopSiteFailoverSimulation() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "ergw";
  const stopParameters = {
    peeringLocation: "Vancouver",
    wasSimulationSuccessful: true,
    details: [
      {
        failoverConnectionName: "conn1",
        failoverLocation: "Denver",
        isVerified: false,
      },
      {
        failoverConnectionName: "conn2",
        failoverLocation: "Amsterdam",
        isVerified: true,
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginStopExpressRouteSiteFailoverSimulationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      stopParameters,
    );
  console.log(result);
}

async function main() {
  await virtualNetworkGatewayStopSiteFailoverSimulation();
}

main().catch(console.error);
