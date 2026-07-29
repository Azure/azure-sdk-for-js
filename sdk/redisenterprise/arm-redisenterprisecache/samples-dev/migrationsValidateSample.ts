// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 *
 * @summary validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 * x-ms-original-file: 2026-02-01-preview/RedisEnterpriseMigrationValidate.json
 */
async function redisEnterpriseMigrationValidate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.validate("rg1", "cache1", {
    sourceResourceId:
      "/subscriptions/e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
    skipDataMigration: true,
    forceMigrate: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseMigrationValidate();
}

main().catch(console.error);
