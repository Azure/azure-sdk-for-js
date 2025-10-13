// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a firewall rule.
 *
 * @summary deletes a firewall rule.
 * x-ms-original-file: 2024-12-30/FirewallRuleDelete.json
 */
async function deleteAFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "testserver", "rule1");
}

async function main(): Promise<void> {
  await deleteAFirewallRule();
}

main().catch(console.error);
