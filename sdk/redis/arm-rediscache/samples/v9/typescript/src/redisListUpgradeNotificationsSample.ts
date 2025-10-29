// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to [Deprecated] Gets any upgrade notifications for a Redis cache.
 *
 * @summary [Deprecated] Gets any upgrade notifications for a Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheListUpgradeNotifications.json
 */
async function redisCacheListUpgradeNotifications(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.redis.listUpgradeNotifications("rg1", "cache1", 5000)) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisCacheListUpgradeNotifications();
}

main().catch(console.error);
