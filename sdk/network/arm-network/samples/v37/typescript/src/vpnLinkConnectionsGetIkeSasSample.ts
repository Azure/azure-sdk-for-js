// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists IKE Security Associations for Vpn Site Link Connection in the specified resource group.
 *
 * @summary lists IKE Security Associations for Vpn Site Link Connection in the specified resource group.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkConnectionGetIkeSas.json
 */
async function getVpnLinkConnectionIkeSa(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnLinkConnections.getIkeSas(
    "rg1",
    "gateway1",
    "vpnConnection1",
    "Connection-Link1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVpnLinkConnectionIkeSa();
}

main().catch(console.error);
