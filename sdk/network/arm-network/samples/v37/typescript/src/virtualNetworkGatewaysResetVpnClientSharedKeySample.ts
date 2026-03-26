// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resets the VPN client shared key of the virtual network gateway in the specified resource group.
 *
 * @summary resets the VPN client shared key of the virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayResetVpnClientSharedKey.json
 */
async function resetVpnClientSharedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.resetVpnClientSharedKey("rg1", "vpngw");
}

async function main(): Promise<void> {
  await resetVpnClientSharedKey();
}

main().catch(console.error);
