// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB pool firewall rule.
 *
 * @summary deletes a HorizonDB pool firewall rule.
 * x-ms-original-file: 2026-10-01-preview/FirewallRules_Delete.json
 */
async function deleteAFirewallRuleFromAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.firewallRules.delete(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "example-firewall-rule-01",
  );
}

async function main(): Promise<void> {
  await deleteAFirewallRuleFromAHorizonDBPool();
}

main().catch(console.error);
