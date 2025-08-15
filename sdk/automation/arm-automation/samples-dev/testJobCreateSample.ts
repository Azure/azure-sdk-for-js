// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestJobCreateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a test job of the runbook.
 *
 * @summary Create a test job of the runbook.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2018-06-30/examples/createTestJob.json
 */
async function createTestJob(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMATION_SUBSCRIPTION_ID"] || "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "mygroup";
  const automationAccountName = "ContoseAutomationAccount";
  const runbookName = "Get-AzureVMTutorial";
  const parameters: TestJobCreateParameters = {
    parameters: { key01: "value01", key02: "value02" },
    runOn: "",
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.testJobOperations.create(
    resourceGroupName,
    automationAccountName,
    runbookName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createTestJob();
}

main().catch(console.error);
