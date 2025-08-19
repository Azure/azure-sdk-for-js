// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes all of the keys in a cache.
 *
 * @summary Deletes all of the keys in a cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFlush.json
 */

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheFlush(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subcription-id";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "resource-group-name";
  const cacheName = "cache-name";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginFlushCacheAndWait(resourceGroupName, cacheName);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheFlush();
}

main().catch(console.error);
