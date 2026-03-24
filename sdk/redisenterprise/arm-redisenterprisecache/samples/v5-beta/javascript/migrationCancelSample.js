// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel or rollback the migration operation in a Redis Enterprise cluster.
 *
 * @summary cancel or rollback the migration operation in a Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationCancel.json
 */
async function redisEnterpriseMigrationCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.migration.cancel("rg1", "cache1");
}

async function main() {
  await redisEnterpriseMigrationCancel();
}

main().catch(console.error);
