// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a outbound firewall rule with a given name.
 *
 * @summary create a outbound firewall rule with a given name.
 * x-ms-original-file: 2025-02-01-preview/OutboundFirewallRuleCreate.json
 */
async function approveOrRejectAOutboundFirewallRuleWithAGivenName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.outboundFirewallRules.createOrUpdate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "server.database.windows.net",
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAOutboundFirewallRuleWithAGivenName();
}

main().catch(console.error);
