// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a vpn connection.
 *
 * @summary deletes a vpn connection.
 * x-ms-original-file: 2025-05-01/VpnConnectionDelete.json
 */
async function vpnConnectionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnConnections.delete("rg1", "gateway1", "vpnConnection1");
}

async function main(): Promise<void> {
  await vpnConnectionDelete();
}

main().catch(console.error);
