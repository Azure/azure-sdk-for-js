// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the redis cache name is valid and is not already in use.
 *
 * @summary checks that the redis cache name is valid and is not already in use.
 * x-ms-original-file: 2024-11-01/RedisCacheCheckNameAvailability.json
 */
async function redisCacheCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.redis.checkNameAvailability({
    name: "cacheName",
    type: "Microsoft.Cache/Redis",
  });
}

async function main() {
  await redisCacheCheckNameAvailability();
}

main().catch(console.error);
