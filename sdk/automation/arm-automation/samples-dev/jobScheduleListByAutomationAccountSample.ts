// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve a list of job schedules.
 *
 * @summary Retrieve a list of job schedules.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/listAllJobSchedulesByAutomationAccount.json
 */

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllJobSchedulesByAutomationAccount(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "ContoseAutomationAccount";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobScheduleOperations.listByAutomationAccount(
    resourceGroupName,
    automationAccountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllJobSchedulesByAutomationAccount();
}

main().catch(console.error);
