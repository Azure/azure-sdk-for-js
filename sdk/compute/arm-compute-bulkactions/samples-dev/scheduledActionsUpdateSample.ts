// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified scheduled action.
 *
 * @summary updates the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_Update_BasicSuccess.json
 */
async function _01UpdateTheActionTypeOfARecurringScheduledAction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.update("example-rg", "weekday-start", {
    properties: { actionType: "Deallocate" },
  });
}

/**
 * This sample demonstrates how to updates the specified scheduled action.
 *
 * @summary updates the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_Update_ComprehensiveSuccess.json
 */
async function _02UpdateARecurringScheduledActionSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.update("example-rg", "weekday-start", {
    properties: {
      schedule: {
        scheduledTime: "19:00:00",
        timeZone: "America/Los_Angeles",
        requestedWeekDays: ["Monday"],
        requestedMonths: ["January"],
        requestedDaysOfTheMonth: [15],
      },
    },
  });
}

async function main(): Promise<void> {
  await _01UpdateTheActionTypeOfARecurringScheduledAction();
  await _02UpdateARecurringScheduledActionSchedule();
}

main().catch(console.error);
