// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a virtual wan vpn gateway.
 *
 * @summary deletes a virtual wan vpn gateway.
 * x-ms-original-file: 2025-05-01/VpnGatewayDelete.json
 */
async function vpnGatewayDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnGateways.delete("rg1", "gateway1");
}

async function main(): Promise<void> {
  await vpnGatewayDelete();
}

main().catch(console.error);
