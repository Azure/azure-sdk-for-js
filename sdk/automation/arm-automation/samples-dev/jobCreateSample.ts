// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a job of the runbook.
 *
 * @summary Create a job of the runbook.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2019-06-01/examples/job/createJob.json
 */

import type { JobCreateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createJob(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMATION_SUBSCRIPTION_ID"] || "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "mygroup";
  const automationAccountName = "ContoseAutomationAccount";
  const jobName = "foo";
  const parameters: JobCreateParameters = {
    parameters: { key01: "value01", key02: "value02" },
    runOn: "",
    runbook: { name: "TestRunbook" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobOperations.create(
    resourceGroupName,
    automationAccountName,
    jobName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createJob();
}

main().catch(console.error);
