// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a scheduled action.
 *
 * @summary creates or updates a scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_CreateOrUpdate_BasicSuccess.json
 */
async function _01CreateANewRecurringScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate("example-rg", "weekday-start", {
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2026-09-15T07:00:00-07:00",
      schedule: {
        scheduledTime: "07:00:00",
        timeZone: "America/Los_Angeles",
        requestedWeekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
      notificationSettings: [],
    },
    location: "eastus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a scheduled action.
 *
 * @summary creates or updates a scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_CreateOrUpdate_ComprehensiveSuccess.json
 */
async function _02CreateARecurringScheduledActionWithComprehensiveSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate(
    "example-rg",
    "first-fifteenth-start",
    {
      properties: {
        resourceType: "VirtualMachine",
        actionType: "Start",
        startTime: "2026-09-01T19:00:00-07:00",
        endTime: "2027-09-01T19:00:00-07:00",
        schedule: {
          scheduledTime: "19:00:00",
          timeZone: "America/Los_Angeles",
          requestedWeekDays: ["All"],
          requestedMonths: ["All"],
          requestedDaysOfTheMonth: [1, 15],
        },
        notificationSettings: [
          { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
        ],
        disabled: false,
      },
      tags: { environment: "production" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await _01CreateANewRecurringScheduledAction();
  await _02CreateARecurringScheduledActionWithComprehensiveSettings();
}

main().catch(console.error);
