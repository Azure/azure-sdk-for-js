// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resume the test job.
 *
 * @summary resume the test job.
 * x-ms-original-file: 2024-10-23/runbook/resumeTestJob.json
 */
async function resumeTestJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.testJobOperations.resume(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
}

async function main(): Promise<void> {
  await resumeTestJob();
}

main().catch(console.error);
