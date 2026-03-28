// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 *
 * @summary generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayGenerateVpnProfile.json
 */
async function generateP2SVpnGatewayVPNProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.generateVpnProfile("rg1", "p2sVpnGateway1", {
    authenticationMethod: "EAPTLS",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generateP2SVpnGatewayVPNProfile();
}

main().catch(console.error);
