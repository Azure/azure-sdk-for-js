// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stop the test job.
 *
 * @summary stop the test job.
 * x-ms-original-file: 2024-10-23/runbook/stopTestJob.json
 */
async function stopTestJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.testJob.stop("mygroup", "ContoseAutomationAccount", "Get-AzureVMTutorial");
}

async function main(): Promise<void> {
  await stopTestJob();
}

main().catch(console.error);
