// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the patching schedule of a redis cache.
 *
 * @summary gets the patching schedule of a redis cache.
 * x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesGet.json
 */
async function redisCachePatchSchedulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.patchSchedules.get("rg1", "cache1", "default");
  console.log(result);
}

async function main() {
  await redisCachePatchSchedulesGet();
}

main().catch(console.error);
