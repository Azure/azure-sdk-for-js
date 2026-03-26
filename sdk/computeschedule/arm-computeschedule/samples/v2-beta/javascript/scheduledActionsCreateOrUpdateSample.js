// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ScheduledAction
 *
 * @summary create a ScheduledAction
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function scheduledActionsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate(
    "rgcomputeschedule",
    "scheduled-action-01",
    {
      properties: {
        resourceType: "VirtualMachine",
        actionType: "Start",
        startTime: "2026-03-12T02:39:45.061Z",
        endTime: "2026-03-12T02:39:45.062Z",
        schedule: {
          scheduledTime: "12:00:00",
          timeZone: "ywgarwvwqegtdsdvv",
          requestedWeekDays: ["Monday"],
          requestedMonths: ["January"],
          requestedDaysOfTheMonth: [18],
          executionParameters: {
            optimizationPreference: "Cost",
            retryPolicy: { retryCount: 19, retryWindowInMinutes: 3, onFailureAction: "Unknown" },
          },
          deadlineType: "Unknown",
        },
        notificationSettings: [
          {
            destination: "zaaoabozbhyuhejwsrennfsxowp",
            type: "Email",
            language: "en-us",
            disabled: true,
          },
        ],
        disabled: true,
      },
      tags: { key1458: "ahuv" },
      location: "hwhsvnvuwsjwu",
    },
  );
  console.log(result);
}

async function main() {
  await scheduledActionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
