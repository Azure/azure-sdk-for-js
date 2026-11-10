// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 *
 * @summary validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource.
 * x-ms-original-file: 2026-10-01-preview/RedisEnterpriseMigrationValidate.json
 */
async function redisEnterpriseMigrationValidate() {
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
 * x-ms-original-file: 2026-10-01-preview/RedisEnterpriseMigrationValidateWithDataMigration.json
 */
async function redisEnterpriseMigrationValidateWithDataMigration() {
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

async function main() {
  await redisEnterpriseMigrationValidate();
  await redisEnterpriseMigrationValidateWithDataMigration();
}

main().catch(console.error);
