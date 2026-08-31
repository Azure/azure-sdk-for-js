// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a scheduled action.
 *
 * @summary creates or updates a scheduled action.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createOrUpdateAScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActions.createOrUpdate("rgcompute", "myScheduledAction", {
    properties: {
      resourceType: "VirtualMachine",
      actionType: "Start",
      startTime: "2025-04-17T00:23:55.281Z",
      endTime: "2026-04-17T00:23:55.281Z",
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
    tags: { key2102: "myTagValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAScheduledAction();
}

main().catch(console.error);
