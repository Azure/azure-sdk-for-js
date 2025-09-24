// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a target group.
 *
 * @summary Creates or updates a target group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CreateOrUpdateJobTargetGroupMax.json
 */
async function createOrUpdateATargetGroupWithAllProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const targetGroupName = "targetGroup1";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobTargetGroups.createOrUpdate(
    resourceGroupName,
    serverName,
    jobAgentName,
    targetGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a target group.
 *
 * @summary Creates or updates a target group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CreateOrUpdateJobTargetGroupMin.json
 */
async function createOrUpdateATargetGroupWithMinimalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const targetGroupName = "targetGroup1";
  const parameters = { members: [] };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobTargetGroups.createOrUpdate(
    resourceGroupName,
    serverName,
    jobAgentName,
    targetGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateATargetGroupWithAllProperties();
  await createOrUpdateATargetGroupWithMinimalProperties();
}

main().catch(console.error);
