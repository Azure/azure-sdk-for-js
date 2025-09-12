// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a job agent.
 *
 * @summary Creates or updates a job agent.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CreateOrUpdateJobAgent.json
 */
async function createOrUpdateAJobAgent() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const parameters = {
    databaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Sql/servers/server1/databases/db1",
    location: "southeastasia",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobAgents.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    jobAgentName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAJobAgent();
}

main().catch(console.error);
