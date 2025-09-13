// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile.
 *
 * @summary Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayGetVpnProfilePackageUrl.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualNetworkGatewayVpnProfilePackageUrl(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetVpnProfilePackageUrlAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayVpnProfilePackageUrl();
}

main().catch(console.error);
