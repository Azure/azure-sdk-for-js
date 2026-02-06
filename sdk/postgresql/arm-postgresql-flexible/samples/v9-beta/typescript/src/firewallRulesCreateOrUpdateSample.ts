// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new firewall rule or updates an existing firewall rule.
 *
 * @summary creates a new firewall rule or updates an existing firewall rule.
 * x-ms-original-file: 2026-01-01-preview/FirewallRulesCreateOrUpdate.json
 */
async function createANewFirewallRuleOrUpdateAnExistingFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate(
    "exampleresourcegroup",
    "exampleserver",
    "examplefirewallrule",
    { endIpAddress: "255.255.255.255", startIpAddress: "0.0.0.0" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createANewFirewallRuleOrUpdateAnExistingFirewallRule();
}

main().catch(console.error);
