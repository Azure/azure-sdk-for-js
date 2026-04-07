// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a firewall rule.
 *
 * @summary deletes a firewall rule.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleDelete.json
 */
async function deleteAFirewallRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.firewallRules.delete(
    "firewallrulecrudtest-9886",
    "firewallrulecrudtest-2368",
    "firewallrulecrudtest-7011",
  );
}

async function main() {
  await deleteAFirewallRule();
}

main().catch(console.error);
