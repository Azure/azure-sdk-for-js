// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a single firewall rule in a specified redis cache.
 *
 * @summary deletes a single firewall rule in a specified redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleDelete.json
 */
async function redisCacheFirewallRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.firewallRules.delete("rg1", "cache1", "rule1");
}

async function main() {
  await redisCacheFirewallRuleDelete();
}

main().catch(console.error);
