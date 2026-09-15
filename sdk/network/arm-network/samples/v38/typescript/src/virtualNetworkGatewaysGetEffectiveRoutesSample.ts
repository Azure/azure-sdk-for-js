// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves a list of effective routes for the virtual network gateway.
 *
 * @summary this operation retrieves a list of effective routes for the virtual network gateway.
 * x-ms-original-file: 2025-09-01/VirtualNetworkGatewayGetEffectiveRoutes.json
 */
async function getVirtualNetworkGatewayEffectiveRoutes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getEffectiveRoutes("rg1", "vpngw");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayEffectiveRoutes();
}

main().catch(console.error);
