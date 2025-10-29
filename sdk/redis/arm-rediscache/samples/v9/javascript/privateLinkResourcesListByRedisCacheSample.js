// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a redis cache.
 *
 * @summary gets the private link resources that need to be created for a redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheListPrivateLinkResources.json
 */
async function storageAccountListPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByRedisCache(
    "rgtest01",
    "cacheTest01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await storageAccountListPrivateLinkResources();
}

main().catch(console.error);
