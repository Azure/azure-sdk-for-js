// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a target group.
 *
 * @summary creates or updates a target group.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobTargetGroupMax.json
 */
async function createOrUpdateATargetGroupWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobTargetGroups.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "targetGroup1",
    {
      members: [
        {
          type: "SqlDatabase",
          databaseName: "database1",
          membershipType: "Exclude",
          serverName: "server1",
        },
        {
          type: "SqlServer",
          membershipType: "Include",
          refreshCredential:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/credentials/testCredential",
          serverName: "server1",
        },
        {
          type: "SqlElasticPool",
          elasticPoolName: "pool1",
          membershipType: "Include",
          refreshCredential:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/credentials/testCredential",
          serverName: "server2",
        },
        {
          type: "SqlShardMap",
          membershipType: "Include",
          refreshCredential:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/jobAgents/agent1/credentials/testCredential",
          serverName: "server3",
          shardMapName: "shardMap1",
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a target group.
 *
 * @summary creates or updates a target group.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobTargetGroupMin.json
 */
async function createOrUpdateATargetGroupWithMinimalProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobTargetGroups.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "targetGroup1",
    { members: [] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateATargetGroupWithAllProperties();
  await createOrUpdateATargetGroupWithMinimalProperties();
}

main().catch(console.error);
