// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resets the primary of the vpn gateway in the specified resource group.
 *
 * @summary resets the primary of the vpn gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VpnGatewayReset.json
 */
async function resetVpnGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnGateways.reset("rg1", "vpngw");
  console.log(result);
}

async function main(): Promise<void> {
  await resetVpnGateway();
}

main().catch(console.error);
