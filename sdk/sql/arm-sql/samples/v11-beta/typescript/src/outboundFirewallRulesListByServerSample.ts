// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all outbound firewall rules on a server.
 *
 * @summary gets all outbound firewall rules on a server.
 * x-ms-original-file: 2025-02-01-preview/OutboundFirewallRuleList.json
 */
async function getsListOfOutboundFirewallRulesOnAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.outboundFirewallRules.listByServer(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfOutboundFirewallRulesOnAServer();
}

main().catch(console.error);
