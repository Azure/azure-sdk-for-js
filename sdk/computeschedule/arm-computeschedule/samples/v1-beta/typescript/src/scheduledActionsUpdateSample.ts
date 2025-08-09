// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ScheduledAction
 *
 * @summary update a ScheduledAction
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_Update_MaximumSet_Gen.json
 */
async function scheduledActionsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.update("rgcomputeschedule", "myScheduledAction", {
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2025-04-17T00:23:58.149Z",
      endTime: "2025-04-17T00:23:58.149Z",
      schedule: {
        scheduledTime: "19:00:00",
        timeZone: "bni",
        requestedWeekDays: ["Monday"],
        requestedMonths: ["January"],
        requestedDaysOfTheMonth: [15],
        executionParameters: {
          optimizationPreference: "Cost",
          retryPolicy: { retryCount: 17, retryWindowInMinutes: 29 },
        },
        deadlineType: "Unknown",
      },
      notificationSettings: [
        {
          destination: "wbhryycyolvnypjxzlawwvb",
          type: "Email",
          language: "en-us",
          disabled: true,
        },
      ],
      disabled: true,
    },
    tags: { key9989: "tryjidk" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsUpdateMaximumSet();
}

main().catch(console.error);
