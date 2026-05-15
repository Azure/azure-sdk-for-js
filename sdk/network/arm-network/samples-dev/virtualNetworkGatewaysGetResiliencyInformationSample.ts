// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score
 *
 * @summary this operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetResiliencyInformation.json
 */
async function getVirtualNetworkGatewayResiliencyInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getResiliencyInformation("rg1", "vpngw", {
    attemptRefresh: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayResiliencyInformation();
}

main().catch(console.error);
