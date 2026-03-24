// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a database in a Redis Enterprise cluster.
 *
 * @summary gets information about a database in a Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesGet.json
 */
async function redisEnterpriseDatabasesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.databases.get("rg1", "cache1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseDatabasesGet();
}

main().catch(console.error);
