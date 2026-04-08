// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all job steps in the specified job version.
 *
 * @summary gets all job steps in the specified job version.
 * x-ms-original-file: 2025-02-01-preview/ListJobStepsByVersion.json
 */
async function listJobStepsForTheSpecifiedVersionOfAJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobSteps.listByVersion(
    "group1",
    "server1",
    "agent1",
    "job1",
    1,
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listJobStepsForTheSpecifiedVersionOfAJob();
}

main().catch(console.error);
