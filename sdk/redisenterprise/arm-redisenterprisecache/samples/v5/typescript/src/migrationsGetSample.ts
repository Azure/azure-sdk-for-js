// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a migration in a Redis Enterprise cluster.
 *
 * @summary gets information about a migration in a Redis Enterprise cluster.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationGet.json
 */
async function redisEnterpriseMigrationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.get("rg1", "cache1");
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseMigrationGet();
}

main().catch(console.error);
