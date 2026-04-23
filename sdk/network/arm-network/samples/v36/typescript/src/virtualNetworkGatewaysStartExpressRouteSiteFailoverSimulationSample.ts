// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation starts failover simulation on the gateway for the specified peering location
 *
 * @summary This operation starts failover simulation on the gateway for the specified peering location
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayStartSiteFailoverSimulation.json
 */
async function virtualNetworkGatewayStartSiteFailoverSimulation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "ergw";
  const peeringLocation = "Vancouver";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginStartExpressRouteSiteFailoverSimulationAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      peeringLocation,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayStartSiteFailoverSimulation();
}

main().catch(console.error);
