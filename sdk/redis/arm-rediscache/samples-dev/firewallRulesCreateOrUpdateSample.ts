// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisFirewallRule } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a redis cache firewall rule
 *
 * @summary Create or update a redis cache firewall rule
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRuleCreate.json
 */
async function redisCacheFirewallRuleCreate(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const cacheName = "cache1";
  const ruleName = "rule1";
  const parameters: RedisFirewallRule = {
    endIP: "192.168.1.4",
    startIP: "192.168.1.1",
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.createOrUpdate(
    resourceGroupName,
    cacheName,
    ruleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheFirewallRuleCreate();
}

main().catch(console.error);
