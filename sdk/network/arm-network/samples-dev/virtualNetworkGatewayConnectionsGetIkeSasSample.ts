// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 *
 * @summary Lists IKE Security Associations for the virtual network gateway connection in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayConnectionGetIkeSas.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualNetworkGatewayConnectionIkeSa(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "vpngwcn1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGatewayConnections.beginGetIkeSasAndWait(
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayConnectionIkeSa();
}

main().catch(console.error);
