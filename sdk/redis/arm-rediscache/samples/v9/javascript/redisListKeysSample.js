// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a Redis cache's access keys. This operation requires write permission to the cache resource.
 *
 * @summary retrieve a Redis cache's access keys. This operation requires write permission to the cache resource.
 * x-ms-original-file: 2024-11-01/RedisCacheListKeys.json
 */
async function redisCacheListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.listKeys("rg1", "cache1");
  console.log(result);
}

async function main() {
  await redisCacheListKeys();
}

main().catch(console.error);
