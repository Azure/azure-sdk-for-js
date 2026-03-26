// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the shared key of VpnLink connection specified.
 *
 * @summary gets the shared key of VpnLink connection specified.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkConnectionDefaultSharedKeyGet.json
 */
async function vpnSiteLinkConnectionDefaultSharedKeyGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnLinkConnections.getDefaultSharedKey(
    "rg1",
    "gateway1",
    "vpnConnection1",
    "Connection-Link1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vpnSiteLinkConnectionDefaultSharedKeyGet();
}

main().catch(console.error);
