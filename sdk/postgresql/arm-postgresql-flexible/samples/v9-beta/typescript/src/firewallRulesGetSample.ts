// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a firewall rule in a server.
 *
 * @summary gets information about a firewall rule in a server.
 * x-ms-original-file: 2026-01-01-preview/FirewallRulesGet.json
 */
async function getInformationAboutAFirewallRuleInAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.firewallRules.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplefirewallrule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAFirewallRuleInAServer();
}

main().catch(console.error);
