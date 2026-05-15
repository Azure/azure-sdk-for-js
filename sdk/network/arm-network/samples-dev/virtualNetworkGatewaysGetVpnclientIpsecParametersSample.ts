// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 *
 * @summary the Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetVpnClientIpsecParameters.json
 */
async function getVirtualNetworkGatewayVpnClientIpsecParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getVpnclientIpsecParameters("rg1", "vpngw");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayVpnClientIpsecParameters();
}

main().catch(console.error);
