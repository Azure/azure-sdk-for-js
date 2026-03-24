// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the Redis Enterprise database's access keys.
 *
 * @summary regenerates the Redis Enterprise database's access keys.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesRegenerateKey.json
 */
async function redisEnterpriseDatabasesRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.databases.regenerateKey("rg1", "cache1", "default", {
    keyType: "Primary",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesRegenerateKey();
}

main().catch(console.error);
