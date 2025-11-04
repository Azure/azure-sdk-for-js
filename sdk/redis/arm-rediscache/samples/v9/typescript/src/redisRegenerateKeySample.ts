// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate Redis cache's access keys. This operation requires write permission to the cache resource.
 *
 * @summary regenerate Redis cache's access keys. This operation requires write permission to the cache resource.
 * x-ms-original-file: 2024-11-01/RedisCacheRegenerateKey.json
 */
async function redisCacheRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.regenerateKey("rg1", "cache1", {
    keyType: "Primary",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheRegenerateKey();
}

main().catch(console.error);
