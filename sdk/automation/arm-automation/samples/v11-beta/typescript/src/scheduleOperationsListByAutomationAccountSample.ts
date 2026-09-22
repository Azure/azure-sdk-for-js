// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of schedules.
 *
 * @summary retrieve a list of schedules.
 * x-ms-original-file: 2024-10-23/listSchedulesByAutomationAccount_First100.json
 */
async function listSchedulesByAutomationAccountFirst100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduleOperations.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve a list of schedules.
 *
 * @summary retrieve a list of schedules.
 * x-ms-original-file: 2024-10-23/listSchedulesByAutomationAccount_Next100.json
 */
async function listSchedulesByAutomationAccountNext100(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduleOperations.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSchedulesByAutomationAccountFirst100();
  await listSchedulesByAutomationAccountNext100();
}

main().catch(console.error);
