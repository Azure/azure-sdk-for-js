// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a target execution.
 *
 * @summary gets a target execution.
 * x-ms-original-file: 2025-02-01-preview/GetJobExecutionTarget.json
 */
async function getAJobStepTargetExecution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobTargetExecutions.get(
    "group1",
    "server1",
    "agent1",
    "job1",
    "5A86BF65-43AC-F258-2524-9E92992F97CA",
    "step1",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  );
  console.log(result);
}

async function main() {
  await getAJobStepTargetExecution();
}

main().catch(console.error);
