// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile.
 *
 * @summary gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetVpnProfilePackageUrl.json
 */
async function getVirtualNetworkGatewayVPNProfilePackageURL(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getVpnProfilePackageUrl("rg1", "vpngw");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayVPNProfilePackageURL();
}

main().catch(console.error);
