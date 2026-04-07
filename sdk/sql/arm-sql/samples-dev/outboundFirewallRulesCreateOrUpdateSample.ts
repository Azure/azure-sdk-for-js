// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a outbound firewall rule with a given name.
 *
 * @summary create a outbound firewall rule with a given name.
 * x-ms-original-file: 2025-02-01-preview/OutboundFirewallRuleCreate.json
 */
async function approveOrRejectAOutboundFirewallRuleWithAGivenName(): Promise<void> {
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

async function main(): Promise<void> {
  await approveOrRejectAOutboundFirewallRuleWithAGivenName();
}

main().catch(console.error);
