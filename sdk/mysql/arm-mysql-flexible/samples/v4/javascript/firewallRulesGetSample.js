// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a server firewall rule.
 *
 * @summary gets information about a server firewall rule.
 * x-ms-original-file: 2024-12-30/FirewallRuleGet.json
 */
async function getAFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.get("TestGroup", "testserver", "rule1");
  console.log(result);
}

async function main() {
  await getAFirewallRule();
}

main().catch(console.error);
