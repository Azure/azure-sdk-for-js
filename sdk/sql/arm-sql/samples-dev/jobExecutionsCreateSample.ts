// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts an elastic job execution.
 *
 * @summary starts an elastic job execution.
 * x-ms-original-file: 2025-02-01-preview/CreateJobExecution.json
 */
async function startAJobExecution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobExecutions.create("group1", "server1", "agent1", "job1");
  console.log(result);
}

async function main(): Promise<void> {
  await startAJobExecution();
}

main().catch(console.error);
