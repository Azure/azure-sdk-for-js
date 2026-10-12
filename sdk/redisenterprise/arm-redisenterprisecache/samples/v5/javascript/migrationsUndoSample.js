// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel or rollback the migration operation in a Redis Enterprise cluster.
 *
 * @summary cancel or rollback the migration operation in a Redis Enterprise cluster.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationUndo.json
 */
async function redisEnterpriseMigrationUndo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.migrations.undo("rg1", "cache1", { body: { rollbackReason: "performance" } });
}

async function main() {
  await redisEnterpriseMigrationUndo();
}

main().catch(console.error);
