// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified virtual network Gateway connection.
 *
 * @summary Deletes the specified virtual network Gateway connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayConnectionDelete.json
 */
async function deleteVirtualNetworkGatewayConnection(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "conn1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGatewayConnections.beginDeleteAndWait(
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteVirtualNetworkGatewayConnection();
}

main().catch(console.error);
