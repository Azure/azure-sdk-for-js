// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves all nat rules for a particular virtual network gateway.
 *
 * @summary retrieves all nat rules for a particular virtual network gateway.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayNatRuleList.json
 */
async function virtualNetworkGatewayNatRuleList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkGatewayNatRules.listByVirtualNetworkGateway(
    "rg1",
    "gateway1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayNatRuleList();
}

main().catch(console.error);
