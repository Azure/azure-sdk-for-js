// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the patching schedule of a redis cache.
 *
 * @summary deletes the patching schedule of a redis cache.
 * x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesDelete.json
 */
async function redisCachePatchSchedulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.patchSchedules.delete("rg1", "cache1", "default");
}

async function main() {
  await redisCachePatchSchedulesDelete();
}

main().catch(console.error);
