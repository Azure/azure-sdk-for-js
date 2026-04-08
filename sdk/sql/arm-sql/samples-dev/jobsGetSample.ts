// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job.
 *
 * @summary gets a job.
 * x-ms-original-file: 2025-02-01-preview/GetJob.json
 */
async function getAJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobs.get("group1", "server1", "agent1", "job1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAJob();
}

main().catch(console.error);
