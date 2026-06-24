// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this action retries the ongoing recovery orchestration job for resources that failed in previous attempts.
 *
 * @summary this action retries the ongoing recovery orchestration job for resources that failed in previous attempts.
 * x-ms-original-file: 2026-04-01-preview/RecoveryJobs_Retry_MaximumSet_Gen.json
 */
async function recoveryJobsRetryMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryJobs.retry(
    "sampleServiceGroupName",
    "qmn",
    "samplePlanName",
    "c56888ef-9ced-4001-a6d4-7145a0309bdb",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryJobsRetryMaximumSet();
}

main().catch(console.error);
