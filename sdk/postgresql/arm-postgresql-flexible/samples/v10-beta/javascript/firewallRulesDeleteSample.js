// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing firewall rule.
 *
 * @summary deletes an existing firewall rule.
 * x-ms-original-file: 2026-01-01-preview/FirewallRulesDelete.json
 */
async function deleteAnExistingFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.firewallRules.delete("exampleresourcegroup", "exampleserver", "examplefirewallrule");
}

async function main() {
  await deleteAnExistingFirewallRule();
}

main().catch(console.error);
