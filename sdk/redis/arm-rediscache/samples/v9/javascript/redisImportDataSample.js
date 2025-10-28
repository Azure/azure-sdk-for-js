// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to import data into Redis cache.
 *
 * @summary import data into Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheImport.json
 */
async function redisCacheImport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.redis.importData("rg1", "cache1", {
    format: "RDB",
    files: ["http://fileuris.contoso.com/pathtofile1"],
    storageSubscriptionId: "storageSubId",
  });
}

async function main() {
  await redisCacheImport();
}

main().catch(console.error);
