// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to import data into Redis cache.
 *
 * @summary import data into Redis cache.
 * x-ms-original-file: 2024-11-01/RedisCacheImport.json
 */
async function redisCacheImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.redis.importData("rg1", "cache1", {
    format: "RDB",
    files: ["http://fileuris.contoso.com/pathtofile1"],
    storageSubscriptionId: "storageSubId",
  });
}

async function main(): Promise<void> {
  await redisCacheImport();
}

main().catch(console.error);
