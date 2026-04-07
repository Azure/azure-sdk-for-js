// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job step in a job's current version.
 *
 * @summary gets a job step in a job's current version.
 * x-ms-original-file: 2025-02-01-preview/GetJobStepByJob.json
 */
async function getTheLatestVersionOfAJobStep(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobSteps.get("group1", "server1", "agent1", "job1", "step1");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheLatestVersionOfAJobStep();
}

main().catch(console.error);
