// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a new migration
 *
 * @summary starts a new migration
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationStart.json
 */
async function redisEnterpriseMigrationStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migration.start("rg1", "cache1", {
    properties: {
      skipDataMigration: true,
      sourceResourceId:
        "/subscriptions/e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f/resourceGroups/rg1/providers/Microsoft.Cache/redis/cache1",
      sourceType: "AzureCacheForRedis",
      switchDns: true,
    },
  });
  console.log(result);
}

async function main() {
  await redisEnterpriseMigrationStart();
}

main().catch(console.error);
