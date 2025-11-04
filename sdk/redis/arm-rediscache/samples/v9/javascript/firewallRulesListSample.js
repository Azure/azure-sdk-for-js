// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all firewall rules in the specified redis cache.
 *
 * @summary gets all firewall rules in the specified redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheFirewallRulesList.json
 */
async function redisCacheFirewallRulesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisCacheFirewallRulesList();
}

main().catch(console.error);
