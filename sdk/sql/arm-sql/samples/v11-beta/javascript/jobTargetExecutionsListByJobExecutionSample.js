// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists target executions for all steps of a job execution.
 *
 * @summary Lists target executions for all steps of a job execution.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ListJobExecutionTargetsByExecution.json
 */
async function listJobStepTargetExecutions() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const jobName = "job1";
  const jobExecutionId = "5A86BF65-43AC-F258-2524-9E92992F97CA";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobTargetExecutions.listByJobExecution(
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobExecutionId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listJobStepTargetExecutions();
}

main().catch(console.error);
