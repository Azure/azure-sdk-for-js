// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unlinks the migrated endpoint from the Azure Managed Redis cluster that was migrated from Azure Cache for Redis, removing the source cache endpoint that was redirected to this cluster during migration.
 *
 * @summary unlinks the migrated endpoint from the Azure Managed Redis cluster that was migrated from Azure Cache for Redis, removing the source cache endpoint that was redirected to this cluster during migration.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationUnlinkMigratedEndpoint.json
 */
async function redisEnterpriseMigrationUnlinkMigratedEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.migrations.unlinkMigratedEndpoint("rg1", "cache1");
}

async function main(): Promise<void> {
  await redisEnterpriseMigrationUnlinkMigratedEndpoint();
}

main().catch(console.error);
