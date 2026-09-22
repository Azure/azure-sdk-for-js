// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ScheduledAction
 *
 * @summary update a ScheduledAction
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_Update_MaximumSet_Gen.json
 */
async function scheduledActionsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.update("rgcomputeschedule", "scheduled-action-01", {
    tags: { environment: "staging" },
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2026-03-12T02:39:45.818Z",
      endTime: "2026-03-12T02:39:45.818Z",
      schedule: {
        scheduledTime: "12:00:00",
        timeZone: "America/Los_Angeles",
        requestedWeekDays: ["Monday"],
        requestedMonths: ["January"],
        requestedDaysOfTheMonth: [1],
        executionParameters: {
          optimizationPreference: "Cost",
          retryPolicy: { retryCount: 3, retryWindowInMinutes: 30, onFailureAction: "Unknown" },
        },
        deadlineType: "Unknown",
      },
      notificationSettings: [
        { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
      ],
      disabled: true,
    },
  });
  console.log(result);
}

async function main() {
  await scheduledActionsUpdateMaximumSet();
}

main().catch(console.error);
