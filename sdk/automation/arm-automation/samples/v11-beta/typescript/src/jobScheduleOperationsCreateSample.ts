// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a job schedule.
 *
 * @summary create a job schedule.
 * x-ms-original-file: 2024-10-23/createJobSchedule.json
 */
async function createAJobSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.jobScheduleOperations.create(
    "rg",
    "ContoseAutomationAccount",
    "0fa462ba-3aa2-4138-83ca-9ebc3bc55cdc",
    {
      parameters: {
        jobscheduletag01: "jobschedulevalue01",
        jobscheduletag02: "jobschedulevalue02",
      },
      runbook: { name: "TestRunbook" },
      schedule: { name: "ScheduleNameGoesHere332204b5-debe-4348-a5c7-6357457189f2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAJobSchedule();
}

main().catch(console.error);
