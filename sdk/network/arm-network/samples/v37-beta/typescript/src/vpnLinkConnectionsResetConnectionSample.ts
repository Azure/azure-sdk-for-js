// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resets the VpnLink connection specified.
 *
 * @summary resets the VpnLink connection specified.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkConnectionReset.json
 */
async function resetVpnLinkConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnLinkConnections.resetConnection(
    "rg1",
    "gateway1",
    "vpnConnection1",
    "Connection-Link1",
  );
}

async function main(): Promise<void> {
  await resetVpnLinkConnection();
}

main().catch(console.error);
