// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a step execution of a job execution.
 *
 * @summary gets a step execution of a job execution.
 * x-ms-original-file: 2025-02-01-preview/GetJobExecutionStep.json
 */
async function getAJobStepExecution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await getAJobStepExecution();
}

main().catch(console.error);
