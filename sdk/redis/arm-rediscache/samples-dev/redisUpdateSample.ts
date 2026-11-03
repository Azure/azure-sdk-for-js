// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing Redis cache.
 *
 * @summary update an existing Redis cache.
 * x-ms-original-file: 2025-08-01-preview/RedisCacheUpdate.json
 */
async function redisCacheUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.update("rg1", "cache1", {
    enableNonSslPort: true,
    replicasPerPrimary: 2,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheUpdate();
}

main().catch(console.error);
