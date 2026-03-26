// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayGetConnectionHealth.json
 */
async function p2SVpnGatewayGetConnectionHealth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.getP2SVpnConnectionHealth("rg1", "p2sVpnGateway1");
  console.log(result);
}

async function main(): Promise<void> {
  await p2SVpnGatewayGetConnectionHealth();
}

main().catch(console.error);
