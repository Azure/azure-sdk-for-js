// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a firewall rule.
 *
 * @summary gets a firewall rule.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleGet.json
 */
async function getFirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.get(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-2304",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFirewallRule();
}

main().catch(console.error);
