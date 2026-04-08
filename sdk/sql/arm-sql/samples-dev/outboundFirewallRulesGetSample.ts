// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an outbound firewall rule.
 *
 * @summary gets an outbound firewall rule.
 * x-ms-original-file: 2025-02-01-preview/OutboundFirewallRuleGet.json
 */
async function getsOutboundFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.outboundFirewallRules.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "server.database.windows.net",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsOutboundFirewallRule();
}

main().catch(console.error);
