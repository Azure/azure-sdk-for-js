// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified virtual network Gateway connection.
 *
 * @summary deletes the specified virtual network Gateway connection.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionDelete.json
 */
async function deleteVirtualNetworkGatewayConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGatewayConnections.delete("rg1", "conn1");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkGatewayConnection();
}

main().catch(console.error);
