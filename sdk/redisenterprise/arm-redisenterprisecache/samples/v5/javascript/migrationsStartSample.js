// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a new migration
 *
 * @summary starts a new migration
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationStart.json
 */
async function redisEnterpriseMigrationStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.start("rg1", "cache1", {
    properties: {
      skipDataMigration: true,
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
      sourceType: "AzureCacheForRedis",
      switchDns: true,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to starts a new migration
 *
 * @summary starts a new migration
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationStartWithDataMigration.json
 */
async function redisEnterpriseMigrationStartWithDataMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.start("rg1", "cache1", {
    properties: {
      skipDataMigration: false,
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
      sourceType: "AzureCacheForRedis",
      switchDns: true,
    },
  });
  console.log(result);
}

async function main() {
  await redisEnterpriseMigrationStart();
  await redisEnterpriseMigrationStartWithDataMigration();
}

main().catch(console.error);
