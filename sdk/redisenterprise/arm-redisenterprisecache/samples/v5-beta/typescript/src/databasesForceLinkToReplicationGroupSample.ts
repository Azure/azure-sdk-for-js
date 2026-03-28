// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group.
 *
 * @summary forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesForceLink.json
 */
async function howToRelinkADatabaseAfterARegionalOutage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.databases.forceLinkToReplicationGroup("rg1", "cache1", "default", {
    geoReplication: {
      groupNickname: "groupName",
      linkedDatabases: [
        {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Cache/redisEnterprise/cache1/databases/default",
        },
        {
          id: "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rg2/providers/Microsoft.Cache/redisEnterprise/cache2/databases/default",
        },
      ],
    },
  });
}

async function main(): Promise<void> {
  await howToRelinkADatabaseAfterARegionalOutage();
}

main().catch(console.error);
