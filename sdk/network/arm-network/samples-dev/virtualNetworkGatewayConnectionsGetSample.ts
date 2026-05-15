// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified virtual network gateway connection by resource group.
 *
 * @summary gets the specified virtual network gateway connection by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionGet.json
 */
async function getVirtualNetworkGatewayConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.get("rg1", "connS2S");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayConnection();
}

main().catch(console.error);
