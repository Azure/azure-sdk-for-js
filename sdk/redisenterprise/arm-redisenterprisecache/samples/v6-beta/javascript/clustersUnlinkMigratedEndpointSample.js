// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unlinks the migrated endpoint from an Azure Managed Redis cluster that was migrated from Azure Cache for Redis Enterprise, removing the source cache endpoint that was redirected to this cluster during migration.
 *
 * @summary unlinks the migrated endpoint from an Azure Managed Redis cluster that was migrated from Azure Cache for Redis Enterprise, removing the source cache endpoint that was redirected to this cluster during migration.
 * x-ms-original-file: 2026-10-01-preview/RedisEnterpriseUnlinkMigratedEndpoint.json
 */
async function redisEnterpriseUnlinkMigratedEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.clusters.unlinkMigratedEndpoint("rg1", "cache1");
}

async function main() {
  await redisEnterpriseUnlinkMigratedEndpoint();
}

main().catch(console.error);
