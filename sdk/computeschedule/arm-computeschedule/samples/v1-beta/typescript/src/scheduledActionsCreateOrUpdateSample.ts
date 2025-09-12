// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ScheduledAction
 *
 * @summary create a ScheduledAction
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function scheduledActionsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate(
    "rgcomputeschedule",
    "myScheduledAction",
    {
      properties: {
        resourceType: "VirtualMachine",
        actionType: "Start",
        startTime: "2025-04-17T00:23:55.281Z",
        endTime: "2025-04-17T00:23:55.286Z",
        schedule: {
          scheduledTime: "19:00:00",
          timeZone: "g",
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
      tags: { key2102: "obwsqwdydpkscnzceopxgkrhrxtdhv" },
      location: "vmuhgdgipeypkcv",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
