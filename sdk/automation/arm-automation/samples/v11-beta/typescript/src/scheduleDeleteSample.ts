// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the schedule identified by schedule name.
 *
 * @summary delete the schedule identified by schedule name.
 * x-ms-original-file: 2024-10-23/deleteSchedule.json
 */
async function deleteSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.schedule.delete("rg", "myAutomationAccount33", "mySchedule");
}

async function main(): Promise<void> {
  await deleteSchedule();
}

main().catch(console.error);
