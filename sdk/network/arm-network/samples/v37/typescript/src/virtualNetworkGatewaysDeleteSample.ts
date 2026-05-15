// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified virtual network gateway.
 *
 * @summary deletes the specified virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayDelete.json
 */
async function deleteVirtualNetworkGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.delete("rg1", "vpngw");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkGateway();
}

main().catch(console.error);
