// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the step executions of a job execution.
 *
 * @summary lists the step executions of a job execution.
 * x-ms-original-file: 2025-02-01-preview/ListJobExecutionSteps.json
 */
async function listJobStepExecutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobStepExecutions.listByJobExecution(
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
  await listJobStepExecutions();
}

main().catch(console.error);
