// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a firewall rule.
 *
 * @summary creates or updates a firewall rule.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleCreate.json
 */
async function createAFirewallRuleMaxOrMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-5370",
    { endIpAddress: "0.0.0.3", startIpAddress: "0.0.0.3" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a firewall rule.
 *
 * @summary creates or updates a firewall rule.
 * x-ms-original-file: 2025-02-01-preview/FirewallRuleUpdate.json
 */
async function updateAFirewallRuleMaxOrMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate(
    "firewallrulecrudtest-12",
    "firewallrulecrudtest-6285",
    "firewallrulecrudtest-3927",
    { endIpAddress: "0.0.0.1", startIpAddress: "0.0.0.1" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAFirewallRuleMaxOrMin();
  await updateAFirewallRuleMaxOrMin();
}

main().catch(console.error);
