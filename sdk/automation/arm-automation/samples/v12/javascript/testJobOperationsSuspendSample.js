// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to suspend the test job.
 *
 * @summary suspend the test job.
 * x-ms-original-file: 2024-10-23/runbook/suspendTestJob.json
 */
async function suspendTestJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  await client.testJobOperations.suspend(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
  );
}

async function main() {
  await suspendTestJob();
}

main().catch(console.error);
