// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the schedule identified by schedule name.
 *
 * @summary update the schedule identified by schedule name.
 * x-ms-original-file: 2024-10-23/updateSchedule.json
 */
async function updateASchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.schedule.update("rg", "myAutomationAccount33", "mySchedule", {
    name: "mySchedule",
    description: "my updated description of schedule goes here",
    isEnabled: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateASchedule();
}

main().catch(console.error);
