// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all job steps for a job's current version.
 *
 * @summary gets all job steps for a job's current version.
 * x-ms-original-file: 2025-02-01-preview/ListJobStepsByJob.json
 */
async function listJobStepsForTheLatestVersionOfAJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobSteps.listByJob("group1", "server1", "agent1", "job1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listJobStepsForTheLatestVersionOfAJob();
}

main().catch(console.error);
