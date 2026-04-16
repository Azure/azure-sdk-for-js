// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing firewall rule.
 *
 * @summary deletes an existing firewall rule.
 * x-ms-original-file: 2026-01-01-preview/FirewallRulesDelete.json
 */
async function deleteAnExistingFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.firewallRules.delete("exampleresourcegroup", "exampleserver", "examplefirewallrule");
}

async function main(): Promise<void> {
  await deleteAnExistingFirewallRule();
}

main().catch(console.error);
