// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all firewall rules in the specified redis cache.
 *
 * @summary Gets all firewall rules in the specified redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRulesList.json
 */

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheFirewallRulesList(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const cacheName = "cache1";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.firewallRules.list(resourceGroupName, cacheName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await redisCacheFirewallRulesList();
}

main().catch(console.error);
