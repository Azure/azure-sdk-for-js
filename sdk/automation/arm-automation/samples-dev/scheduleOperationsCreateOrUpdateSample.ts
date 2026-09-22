// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a schedule.
 *
 * @summary create a schedule.
 * x-ms-original-file: 2024-10-23/createOrUpdateSchedule.json
 */
async function createOrUpdateASchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.scheduleOperations.createOrUpdate(
    "rg",
    "myAutomationAccount33",
    "mySchedule",
    {
      name: "mySchedule",
      description: "my description of schedule goes here",
      advancedSchedule: {},
      expiryTime: new Date("2017-04-01T17:28:57.2494819Z"),
      frequency: "Hour",
      interval: 1,
      startTime: new Date("2017-03-27T17:28:57.2494819Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASchedule();
}

main().catch(console.error);
