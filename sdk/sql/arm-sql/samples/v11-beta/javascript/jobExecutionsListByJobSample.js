// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a job's executions.
 *
 * @summary lists a job's executions.
 * x-ms-original-file: 2025-02-01-preview/ListJobExecutionsByJob.json
 */
async function listAJobExecutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobExecutions.listByJob("group1", "server1", "agent1", "job1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAJobExecutions();
}

main().catch(console.error);
