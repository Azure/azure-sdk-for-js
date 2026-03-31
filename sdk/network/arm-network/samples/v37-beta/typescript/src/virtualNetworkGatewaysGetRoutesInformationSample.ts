// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the route set information for an Express Route Gateway based on their resiliency
 *
 * @summary this operation retrieves the route set information for an Express Route Gateway based on their resiliency
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetRoutesInformation.json
 */
async function getVirtualNetworkGatewayRoutesInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getRoutesInformation("rg1", "vpngw", {
    attemptRefresh: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayRoutesInformation();
}

main().catch(console.error);
