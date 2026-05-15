// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the VpnGateways in a resource group.
 *
 * @summary lists all the VpnGateways in a resource group.
 * x-ms-original-file: 2025-05-01/VpnGatewayListByResourceGroup.json
 */
async function vpnGatewayListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnGateways.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await vpnGatewayListByResourceGroup();
}

main().catch(console.error);
