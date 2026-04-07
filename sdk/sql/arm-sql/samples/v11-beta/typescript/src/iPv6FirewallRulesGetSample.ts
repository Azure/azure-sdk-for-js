// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an IPv6 firewall rule.
 *
 * @summary gets an IPv6 firewall rule.
 * x-ms-original-file: 2025-02-01-preview/IPv6FirewallRuleGet.json
 */
async function getIPv6FirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.iPv6FirewallRules.get(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-2304",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getIPv6FirewallRule();
}

main().catch(console.error);
