// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a RecoveryJob
 *
 * @summary get a RecoveryJob
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobs_Get_MaximumSet_Gen.json
 */
async function recoveryJobsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryJobs.get(
    "sampleServiceGroupName",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryJobsGetMaximumSet();
}

main().catch(console.error);
