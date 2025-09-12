// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all firewall rules in the specified redis cache.
 *
 * @summary gets all firewall rules in the specified redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheFirewallRulesList.json
 */
async function redisCacheFirewallRulesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisCacheFirewallRulesList();
}

main().catch(console.error);
