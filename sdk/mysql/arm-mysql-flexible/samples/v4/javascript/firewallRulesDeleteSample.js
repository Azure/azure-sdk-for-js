// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a firewall rule.
 *
 * @summary deletes a firewall rule.
 * x-ms-original-file: 2024-12-30/FirewallRuleDelete.json
 */
async function deleteAFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.firewallRules.delete("TestGroup", "testserver", "rule1");
}

async function main() {
  await deleteAFirewallRule();
}

main().catch(console.error);
