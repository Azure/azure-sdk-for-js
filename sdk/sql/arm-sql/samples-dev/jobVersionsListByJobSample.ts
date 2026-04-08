// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all versions of a job.
 *
 * @summary gets all versions of a job.
 * x-ms-original-file: 2025-02-01-preview/ListJobVersions.json
 */
async function getAllVersionsOfAJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobVersions.listByJob("group1", "server1", "agent1", "job1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllVersionsOfAJob();
}

main().catch(console.error);
