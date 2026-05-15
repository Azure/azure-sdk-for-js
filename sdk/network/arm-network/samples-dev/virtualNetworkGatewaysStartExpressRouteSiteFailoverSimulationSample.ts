// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation starts failover simulation on the gateway for the specified peering location
 *
 * @summary this operation starts failover simulation on the gateway for the specified peering location
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayStartSiteFailoverSimulation.json
 */
async function virtualNetworkGatewayStartSiteFailoverSimulation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.startExpressRouteSiteFailoverSimulation(
    "rg1",
    "ergw",
    "Vancouver",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayStartSiteFailoverSimulation();
}

main().catch(console.error);
