// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified recurring bulk action.
 *
 * @summary updates the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Update_BasicSuccess.json
 */
async function _01UpdateTheActionTypeOfARecurringBulkAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.update("example-rg", "weekday-start", {
    properties: { actionType: "Deallocate" },
  });
}

/**
 * This sample demonstrates how to updates the specified recurring bulk action.
 *
 * @summary updates the specified recurring bulk action.
 * x-ms-original-file: 2026-10-06-preview/RecurringBulkActions_Update_ComprehensiveSuccess.json
 */
async function _02UpdateARecurringBulkActionSchedule() {
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

async function main() {
  await _01UpdateTheActionTypeOfARecurringBulkAction();
  await _02UpdateARecurringBulkActionSchedule();
}

main().catch(console.error);
