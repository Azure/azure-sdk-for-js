// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops failover simulation on the ExpressRoute gateway for the specified peering location.
 *
 * @summary stops failover simulation on the ExpressRoute gateway for the specified peering location.
 * x-ms-original-file: 2025-07-01/ExpressRouteGatewayStopSiteFailoverTest.json
 */
async function expressRouteGatewayStopSiteFailoverTest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.stopSiteFailoverTest("rg1", "ergw1", {
    stopParameters: {
      peeringLocation: "Vancouver",
      wasSimulationSuccessful: true,
      details: [{ failoverConnectionName: "conn1", failoverLocation: "Denver", isVerified: true }],
    },
  });
  console.log(result);
}

async function main() {
  await expressRouteGatewayStopSiteFailoverTest();
}

main().catch(console.error);
