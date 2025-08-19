// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the patching schedule of a redis cache.
 *
 * @summary Deletes the patching schedule of a redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePatchSchedulesDelete.json
 */

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCachePatchSchedulesDelete(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const name = "cache1";
  const defaultParam = "default";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.patchSchedules.delete(resourceGroupName, name, defaultParam);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCachePatchSchedulesDelete();
}

main().catch(console.error);
