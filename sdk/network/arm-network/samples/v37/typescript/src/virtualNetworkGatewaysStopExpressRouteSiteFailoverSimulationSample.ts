// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation stops failover simulation on the gateway for the specified peering location
 *
 * @summary this operation stops failover simulation on the gateway for the specified peering location
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayStopSiteFailoverSimulation.json
 */
async function virtualNetworkGatewayStopSiteFailoverSimulation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.stopExpressRouteSiteFailoverSimulation(
    "rg1",
    "ergw",
    {
      peeringLocation: "Vancouver",
      wasSimulationSuccessful: true,
      details: [
        { failoverConnectionName: "conn1", failoverLocation: "Denver", isVerified: false },
        { failoverConnectionName: "conn2", failoverLocation: "Amsterdam", isVerified: true },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayStopSiteFailoverSimulation();
}

main().catch(console.error);
