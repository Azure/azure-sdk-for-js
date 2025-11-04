// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss.
 *
 * @summary reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss.
 * x-ms-original-file: 2024-11-01/RedisCacheForceReboot.json
 */
async function redisCacheForceReboot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.redis.forceReboot("rg1", "cache1", {
    ports: [13000, 15001],
    rebootType: "AllNodes",
    shardId: 0,
  });
  console.log(result);
}

async function main() {
  await redisCacheForceReboot();
}

main().catch(console.error);
