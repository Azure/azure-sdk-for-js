// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 *
 * @summary validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationValidate.json
 */
async function redisEnterpriseMigrationValidate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.validate("rg1", "cache1", {
    sourceResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
    skipDataMigration: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 *
 * @summary validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationValidateWithDataMigration.json
 */
async function redisEnterpriseMigrationValidateWithDataMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.validate("rg1", "cache1", {
    sourceResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
    skipDataMigration: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseMigrationValidate();
  await redisEnterpriseMigrationValidateWithDataMigration();
}

main().catch(console.error);
