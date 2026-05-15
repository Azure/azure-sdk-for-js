// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resets the primary of the p2s vpn gateway in the specified resource group.
 *
 * @summary resets the primary of the p2s vpn gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayReset.json
 */
async function resetP2SVpnGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.reset("rg1", "p2sVpnGateway1");
  console.log(result);
}

async function main(): Promise<void> {
  await resetP2SVpnGateway();
}

main().catch(console.error);
