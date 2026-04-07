// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a outbound firewall rule with a given name.
 *
 * @summary deletes a outbound firewall rule with a given name.
 * x-ms-original-file: 2025-02-01-preview/OutboundFirewallRuleDelete.json
 */
async function deletesAOutboundFirewallRuleWithAGivenName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.outboundFirewallRules.delete(
    "sqlcrudtest-7398",
    "sqlcrudtest-6661",
    "server.database.windows.net",
  );
}

async function main() {
  await deletesAOutboundFirewallRuleWithAGivenName();
}

main().catch(console.error);
