// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all HorizonDB firewall rules in a pool.
 *
 * @summary lists all HorizonDB firewall rules in a pool.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_List.json
 */
async function listFirewallRulesInAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.list(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFirewallRulesInAHorizonDBPool();
}

main().catch(console.error);
