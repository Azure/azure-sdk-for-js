// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB pool firewall rule.
 *
 * @summary gets information about a HorizonDB pool firewall rule.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_Get.json
 */
async function getAFirewallRuleOnAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.firewallRules.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "example-firewall-rule-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAFirewallRuleOnAHorizonDBPool();
}

main().catch(console.error);
