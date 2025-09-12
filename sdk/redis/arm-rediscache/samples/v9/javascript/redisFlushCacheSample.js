// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes all of the keys in a cache.
 *
 * @summary deletes all of the keys in a cache.
 * x-ms-original-file: 2024-11-01/RedisCacheFlush.json
 */
async function redisCacheFlush() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.flushCache("resource-group-name", "cache-name");
  console.log(result);
}

async function main() {
  await redisCacheFlush();
}

main().catch(console.error);
