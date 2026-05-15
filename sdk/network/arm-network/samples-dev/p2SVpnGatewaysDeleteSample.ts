// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a virtual wan p2s vpn gateway.
 *
 * @summary deletes a virtual wan p2s vpn gateway.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayDelete.json
 */
async function p2SVpnGatewayDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.p2SVpnGateways.delete("rg1", "p2sVpnGateway1");
}

async function main(): Promise<void> {
  await p2SVpnGatewayDelete();
}

main().catch(console.error);
