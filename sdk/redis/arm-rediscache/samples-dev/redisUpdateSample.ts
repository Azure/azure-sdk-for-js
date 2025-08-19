// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an existing Redis cache.
 *
 * @summary Update an existing Redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheUpdate.json
 */

import type { RedisUpdateParameters } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheUpdate(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const parameters: RedisUpdateParameters = {
    enableNonSslPort: true,
    replicasPerPrimary: 2,
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.beginUpdateAndWait(resourceGroupName, name, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheUpdate();
}

main().catch(console.error);
