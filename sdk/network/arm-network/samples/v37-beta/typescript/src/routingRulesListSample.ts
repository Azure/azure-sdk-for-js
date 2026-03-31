// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all network manager routing configuration routing rules.
 *
 * @summary list all network manager routing configuration routing rules.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleList.json
 */
async function listRoutingRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routingRules.list(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoutingRules();
}

main().catch(console.error);
