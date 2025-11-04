// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Redis caches in a resource group.
 *
 * @summary lists all Redis caches in a resource group.
 * x-ms-original-file: 2024-11-01/RedisCacheListByResourceGroup.json
 */
async function redisCacheListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.redis.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisCacheListByResourceGroup();
}

main().catch(console.error);
