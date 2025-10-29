// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the patching schedule of a redis cache.
 *
 * @summary gets the patching schedule of a redis cache.
 * x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesGet.json
 */
async function redisCachePatchSchedulesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.patchSchedules.get("rg1", "cache1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await redisCachePatchSchedulesGet();
}

main().catch(console.error);
