// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Adds an access policy to the redis cache
 *
 * @summary Adds an access policy to the redis cache
 * x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyCreateUpdate.json
 */

import type { RedisCacheAccessPolicy } from "@azure/arm-rediscache";
import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function redisCacheAccessPolicyCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["REDIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["REDIS_RESOURCE_GROUP"] || "rg1";
  const cacheName = "cache1";
  const accessPolicyName = "accessPolicy1";
  const parameters: RedisCacheAccessPolicy = { permissions: "+get +hget" };
  const credential = new DefaultAzureCredential();
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.accessPolicy.beginCreateUpdateAndWait(
    resourceGroupName,
    cacheName,
    accessPolicyName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheAccessPolicyCreateUpdate();
}

main().catch(console.error);
