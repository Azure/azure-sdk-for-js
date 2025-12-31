// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all target groups in an agent.
 *
 * @summary Gets all target groups in an agent.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ListJobTargetGroups.json
 */
async function getAllTargetGroupsInAnAgent() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobTargetGroups.listByAgent(
    resourceGroupName,
    serverName,
    jobAgentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllTargetGroupsInAnAgent();
}

main().catch(console.error);
