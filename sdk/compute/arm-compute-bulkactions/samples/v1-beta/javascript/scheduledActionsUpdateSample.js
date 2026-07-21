// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ScheduledAction
 *
 * @summary update a ScheduledAction
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_Update_MaximumSet_Gen.json
 */
async function scheduledActionsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  await client.scheduledActions.update("rgcompute", "myScheduledAction", {
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2025-04-17T00:23:58.149Z",
      endTime: "2025-04-17T00:23:58.149Z",
      schedule: {
        scheduledTime: "19:00:00",
        timeZone: "America/Los_Angeles",
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
        { destination: "admin@contoso.com", type: "Email", language: "en-us", disabled: true },
      ],
      disabled: true,
    },
    tags: { key9989: "myTagValue" },
  });
}

async function main() {
  await scheduledActionsUpdateMaximumSet();
}

main().catch(console.error);
