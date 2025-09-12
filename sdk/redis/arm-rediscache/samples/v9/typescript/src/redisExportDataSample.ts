// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to export data from the redis cache to blobs in a container.
 *
 * @summary export data from the redis cache to blobs in a container.
 * x-ms-original-file: 2024-11-01/RedisCacheExport.json
 */
async function redisCacheExport(): Promise<void> {
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

async function main(): Promise<void> {
  await redisCacheExport();
}

main().catch(console.error);
