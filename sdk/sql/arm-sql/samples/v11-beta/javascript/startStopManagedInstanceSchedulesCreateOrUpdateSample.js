// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the managed instance's Start/Stop schedule.
 *
 * @summary creates or updates the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleCreateOrUpdateMax.json
 */
async function createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithAllOptionalParametersSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.createOrUpdate(
    "schedulerg",
    "schedulemi",
    "default",
    {
      description: "This is a schedule for our Dev/Test environment.",
      scheduleList: [
        { startDay: "Thursday", startTime: "18:00", stopDay: "Thursday", stopTime: "17:00" },
        { startDay: "Thursday", startTime: "15:00", stopDay: "Thursday", stopTime: "14:00" },
      ],
      timeZoneId: "Central European Standard Time",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the managed instance's Start/Stop schedule.
 *
 * @summary creates or updates the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleCreateOrUpdateMin.json
 */
async function createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithNoOptionalParametersSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.createOrUpdate(
    "schedulerg",
    "schedulemi",
    "default",
    {
      scheduleList: [
        { startDay: "Thursday", startTime: "18:00", stopDay: "Thursday", stopTime: "17:00" },
        { startDay: "Thursday", startTime: "15:00", stopDay: "Thursday", stopTime: "14:00" },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithAllOptionalParametersSpecified();
  await createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithNoOptionalParametersSpecified();
}

main().catch(console.error);
