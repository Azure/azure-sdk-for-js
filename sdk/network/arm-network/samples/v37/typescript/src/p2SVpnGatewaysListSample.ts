// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the P2SVpnGateways in a subscription.
 *
 * @summary lists all the P2SVpnGateways in a subscription.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayList.json
 */
async function p2SVpnGatewayListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.p2SVpnGateways.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await p2SVpnGatewayListBySubscription();
}

main().catch(console.error);
