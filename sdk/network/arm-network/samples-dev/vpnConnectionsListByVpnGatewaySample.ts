// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves all vpn connections for a particular virtual wan vpn gateway.
 *
 * @summary retrieves all vpn connections for a particular virtual wan vpn gateway.
 * x-ms-original-file: 2025-05-01/VpnConnectionList.json
 */
async function vpnConnectionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnConnections.listByVpnGateway("rg1", "gateway1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await vpnConnectionList();
}

main().catch(console.error);
