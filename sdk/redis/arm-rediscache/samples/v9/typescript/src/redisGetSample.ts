// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Redis cache (resource description).
 *
 * @summary gets a Redis cache (resource description).
 * x-ms-original-file: 2024-11-01/RedisCacheGet.json
 */
async function redisCacheGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.get("rg1", "cache1");
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheGet();
}

main().catch(console.error);
