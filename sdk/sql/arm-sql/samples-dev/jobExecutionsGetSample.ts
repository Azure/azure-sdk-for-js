// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job execution.
 *
 * @summary gets a job execution.
 * x-ms-original-file: 2025-02-01-preview/GetJobExecution.json
 */
async function getAJobExecution(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobExecutions.get(
    "group1",
    "server1",
    "agent1",
    "job1",
    "5A86BF65-43AC-F258-2524-9E92992F97CA",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAJobExecution();
}

main().catch(console.error);
