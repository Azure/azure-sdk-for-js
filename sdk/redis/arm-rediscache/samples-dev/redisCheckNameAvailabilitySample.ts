// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the redis cache name is valid and is not already in use.
 *
 * @summary Checks that the redis cache name is valid and is not already in use.
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCheckNameAvailability.json
 */

import type { CheckNameAvailabilityParameters } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheCheckNameAvailability(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const parameters: CheckNameAvailabilityParameters = {
    name: "cacheName",
    type: "Microsoft.Cache/Redis",
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.checkNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheCheckNameAvailability();
}

main().catch(console.error);
