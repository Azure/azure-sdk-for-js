// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a single database
 *
 * @summary deletes a single database
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesDelete.json
 */
async function redisEnterpriseDatabasesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.delete("rg1", "cache1", "db1");
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesDelete();
}

main().catch(console.error);
