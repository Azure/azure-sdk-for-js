// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all Redis caches in the specified subscription.
 *
 * @summary gets all Redis caches in the specified subscription.
 * x-ms-original-file: 2024-11-01/RedisCacheList.json
 */
async function redisCacheList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.redis.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisCacheList();
}

main().catch(console.error);
