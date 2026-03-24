// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to forcibly removes the link to the specified database resource.
 *
 * @summary forcibly removes the link to the specified database resource.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesForceUnlink.json
 */
async function howToUnlinkADatabaseDuringARegionalOutage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.forceUnlink("rg1", "cache1", "default", {
    ids: [
      "/subscriptions/e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f2/resourceGroups/rg2/providers/Microsoft.Cache/redisEnterprise/cache2/databases/default",
    ],
  });
}

async function main() {
  await howToUnlinkADatabaseDuringARegionalOutage();
}

main().catch(console.error);
