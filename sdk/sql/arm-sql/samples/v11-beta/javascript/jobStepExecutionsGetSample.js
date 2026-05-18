// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a step execution of a job execution.
 *
 * @summary gets a step execution of a job execution.
 * x-ms-original-file: 2025-02-01-preview/GetJobExecutionStep.json
 */
async function getAJobStepExecution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobStepExecutions.get(
    "group1",
    "server1",
    "agent1",
    "job1",
    "5A86BF65-43AC-F258-2524-9E92992F97CA",
    "step1",
  );
  console.log(result);
}

async function main() {
  await getAJobStepExecution();
}

main().catch(console.error);
