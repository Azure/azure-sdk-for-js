// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VpnClientParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 *
 * @summary Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGenerateVpnProfile.json
 */
async function generateVirtualNetworkGatewayVpnProfile(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const parameters: VpnClientParameters = {};
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGenerateVpnProfileAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await generateVirtualNetworkGatewayVpnProfile();
}

main().catch(console.error);
