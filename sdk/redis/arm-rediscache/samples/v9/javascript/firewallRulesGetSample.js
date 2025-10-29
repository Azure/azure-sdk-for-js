// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a single firewall rule in a specified redis cache.
 *
 * @summary gets a single firewall rule in a specified redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleGet.json
 */
async function redisCacheFirewallRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.get("rg1", "cache1", "rule1");
  console.log(result);
}

async function main() {
  await redisCacheFirewallRuleGet();
}

main().catch(console.error);
