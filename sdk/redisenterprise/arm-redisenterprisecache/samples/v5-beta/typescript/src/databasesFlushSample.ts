// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to flushes all the keys in this database and also from its linked databases.
 *
 * @summary flushes all the keys in this database and also from its linked databases.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesFlush.json
 */
async function howToFlushAllTheKeysInTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.flush("rg1", "cache1", "default", {
    parameters: {
      ids: [
        "/subscriptions/e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f2/resourceGroups/rg2/providers/Microsoft.Cache/redisEnterprise/cache2/databases/default",
      ],
    },
  });
}

async function main(): Promise<void> {
  await howToFlushAllTheKeysInTheDatabase();
}

main().catch(console.error);
