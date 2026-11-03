// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of job schedules.
 *
 * @summary retrieve a list of job schedules.
 * x-ms-original-file: 2024-10-23/listAllJobSchedulesByAutomationAccount.json
 */
async function listAllJobSchedulesByAutomationAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobScheduleOperations.listByAutomationAccount(
    "rg",
    "ContoseAutomationAccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllJobSchedulesByAutomationAccount();
}

main().catch(console.error);
