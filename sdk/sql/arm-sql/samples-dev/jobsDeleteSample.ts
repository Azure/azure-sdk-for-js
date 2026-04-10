// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a job.
 *
 * @summary deletes a job.
 * x-ms-original-file: 2025-02-01-preview/DeleteJob.json
 */
async function deleteAJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.jobs.delete("group1", "server1", "agent1", "job1");
}

async function main(): Promise<void> {
  await deleteAJob();
}

main().catch(console.error);
