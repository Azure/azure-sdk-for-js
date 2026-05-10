// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an IPv6 firewall rule.
 *
 * @summary creates or updates an IPv6 firewall rule.
 * x-ms-original-file: 2025-02-01-preview/IPv6FirewallRuleCreate.json
 */
async function createAnIPv6FirewallRuleMaxOrMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.iPv6FirewallRules.createOrUpdate(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-5370",
    {
      endIPv6Address: "0000:0000:0000:0000:0000:ffff:0000:0003",
      startIPv6Address: "0000:0000:0000:0000:0000:ffff:0000:0003",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an IPv6 firewall rule.
 *
 * @summary creates or updates an IPv6 firewall rule.
 * x-ms-original-file: 2025-02-01-preview/IPv6FirewallRuleUpdate.json
 */
async function updateAnIPv6FirewallRuleMaxOrMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.iPv6FirewallRules.createOrUpdate(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-3927",
    {
      endIPv6Address: "0000:0000:0000:0000:0000:ffff:0000:0001",
      startIPv6Address: "0000:0000:0000:0000:0000:ffff:0000:0001",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnIPv6FirewallRuleMaxOrMin();
  await updateAnIPv6FirewallRuleMaxOrMin();
}

main().catch(console.error);
