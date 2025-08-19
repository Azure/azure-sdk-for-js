// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generates VPN client package for P2S client of the virtual network gateway in the specified resource group.
 *
 * @summary Generates VPN client package for P2S client of the virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/VirtualNetworkGatewayGenerateVpnClientPackage.json
 */

import type { VpnClientParameters } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function generateVpnClientPackage(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const parameters: VpnClientParameters = {};
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginGeneratevpnclientpackageAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateVpnClientPackage();
}

main().catch(console.error);
