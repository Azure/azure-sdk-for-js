// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a redis cache.
 *
 * @summary Gets the private link resources that need to be created for a redis cache.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListPrivateLinkResources.json
 */

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function storageAccountListPrivateLinkResources(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rgtest01";
  const cacheName = "cacheTest01";
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByRedisCache(
    resourceGroupName,
    cacheName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await storageAccountListPrivateLinkResources();
}

main().catch(console.error);
