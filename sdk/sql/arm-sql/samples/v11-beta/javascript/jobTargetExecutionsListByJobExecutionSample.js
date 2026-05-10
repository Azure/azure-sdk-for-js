// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists target executions for all steps of a job execution.
 *
 * @summary lists target executions for all steps of a job execution.
 * x-ms-original-file: 2025-02-01-preview/ListJobExecutionTargetsByExecution.json
 */
async function listJobStepTargetExecutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobTargetExecutions.listByJobExecution(
    "group1",
    "server1",
    "agent1",
    "job1",
    "5A86BF65-43AC-F258-2524-9E92992F97CA",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listJobStepTargetExecutions();
}

main().catch(console.error);
