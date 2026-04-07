// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an IPv6 firewall rule.
 *
 * @summary deletes an IPv6 firewall rule.
 * x-ms-original-file: 2025-02-01-preview/IPv6FirewallRuleDelete.json
 */
async function deleteAnIPv6FirewallRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.iPv6FirewallRules.delete(
    "firewallrulecrudtest-9886",
    "firewallrulecrudtest-2368",
    "firewallrulecrudtest-7011",
  );
}

async function main(): Promise<void> {
  await deleteAnIPv6FirewallRule();
}

main().catch(console.error);
