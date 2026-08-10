// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ScheduledAction
 *
 * @summary create a ScheduledAction
 * x-ms-original-file: 2026-07-06-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function scheduledActionsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate("rgcompute", "myScheduledAction", {
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2025-04-17T00:23:55.281Z",
      endTime: "2025-04-17T00:23:55.286Z",
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
    tags: { key2102: "myTagValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
