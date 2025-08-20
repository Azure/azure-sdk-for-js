// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate Redis cache's access keys. This operation requires write permission to the cache resource.
 *
 * @summary Regenerate Redis cache's access keys. This operation requires write permission to the cache resource.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheRegenerateKey.json
 */

import type { RedisRegenerateKeyParameters } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheRegenerateKey(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisRegenerateKeyParameters = { keyType: "Primary" };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.regenerateKey(resourceGroupName, name, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheRegenerateKey();
}

main().catch(console.error);
