// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to export data from the redis cache to blobs in a container.
 *
 * @summary export data from the redis cache to blobs in a container.
 * x-ms-original-file: 2024-11-01/RedisCacheExport.json
 */
async function redisCacheExport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.redis.exportData("rg1", "cache1", {
    format: "RDB",
    container: "https://contosostorage.blob.core.window.net/urltoBlobContainer?sasKeyParameters",
    prefix: "datadump1",
    storageSubscriptionId: "storageSubId",
  });
}

async function main() {
  await redisCacheExport();
}

main().catch(console.error);
