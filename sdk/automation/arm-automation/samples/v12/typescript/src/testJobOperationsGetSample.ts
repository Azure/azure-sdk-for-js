// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the test job for the specified runbook.
 *
 * @summary retrieve the test job for the specified runbook.
 * x-ms-original-file: 2024-10-23/runbook/getTestJob.json
 */
async function getTestJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.testJobOperations.get(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTestJob();
}

main().catch(console.error);
