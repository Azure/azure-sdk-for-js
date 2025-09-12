// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing Redis cache.
 *
 * @summary update an existing Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheUpdate.json
 */
async function redisCacheUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.update("rg1", "cache1", {
    properties: { enableNonSslPort: true, replicasPerPrimary: 2 },
  });
  console.log(result);
}

async function main() {
  await redisCacheUpdate();
}

main().catch(console.error);
