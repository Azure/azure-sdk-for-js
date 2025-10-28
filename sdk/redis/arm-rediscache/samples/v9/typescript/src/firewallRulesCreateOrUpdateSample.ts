// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a redis cache firewall rule
 *
 * @summary create or update a redis cache firewall rule
 * x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleCreate.json
 */
async function redisCacheFirewallRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate("rg1", "cache1", "rule1", {
    properties: { endIP: "192.168.1.4", startIP: "192.168.1.1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheFirewallRuleCreate();
}

main().catch(console.error);
