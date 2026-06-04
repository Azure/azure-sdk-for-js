// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a test job of the runbook.
 *
 * @summary create a test job of the runbook.
 * x-ms-original-file: 2024-10-23/runbook/createTestJob.json
 */
async function createTestJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.testJob.create(
    "mygroup",
    "ContoseAutomationAccount",
    "Get-AzureVMTutorial",
    {
      parameters: { key01: "value01", key02: "value02" },
      runOn: "",
      runtimeEnvironment: "runtimeEnvironmentName",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createTestJob();
}

main().catch(console.error);
