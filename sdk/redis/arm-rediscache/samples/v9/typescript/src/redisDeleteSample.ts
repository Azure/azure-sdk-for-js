// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Redis cache.
 *
 * @summary deletes a Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheDelete.json
 */
async function redisCacheDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.redis.delete("rg1", "cache1");
}

async function main(): Promise<void> {
  await redisCacheDelete();
}

main().catch(console.error);
