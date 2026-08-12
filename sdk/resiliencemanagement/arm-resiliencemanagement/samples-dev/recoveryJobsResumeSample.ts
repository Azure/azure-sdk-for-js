// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action resumes the ongoing recovery orchestration job that was paused for required user intervention.
 *
 * @summary this action resumes the ongoing recovery orchestration job that was paused for required user intervention.
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobs_Resume_MaximumSet_Gen.json
 */
async function recoveryJobsResumeMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryJobs.resume(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
    { description: "Resuming the recovery job after user verification" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryJobsResumeMaximumSet();
}

main().catch(console.error);
