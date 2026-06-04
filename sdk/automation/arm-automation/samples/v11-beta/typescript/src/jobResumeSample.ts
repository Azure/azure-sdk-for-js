// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resume the job identified by jobName.
 *
 * @summary resume the job identified by jobName.
 * x-ms-original-file: 2024-10-23/job/resumeJob.json
 */
async function resumeJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.job.resume("mygroup", "ContoseAutomationAccount", "foo");
}

async function main(): Promise<void> {
  await resumeJob();
}

main().catch(console.error);
