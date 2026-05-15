// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider.
 *
 * @summary the Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayConnectionSetSharedKey.json
 */
async function setVirtualNetworkGatewayConnectionSharedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGatewayConnections.setSharedKey("rg1", "connS2S", {
    value: "AzureAbc123",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await setVirtualNetworkGatewayConnectionSharedKey();
}

main().catch(console.error);
