// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a job.
 *
 * @summary deletes a job.
 * x-ms-original-file: 2025-07-01/JobsDelete.json
 */
async function jobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  await client.jobs.delete("YourResourceGroupName", "TestJobName1");
}

async function main(): Promise<void> {
  await jobsDelete();
}

main().catch(console.error);
