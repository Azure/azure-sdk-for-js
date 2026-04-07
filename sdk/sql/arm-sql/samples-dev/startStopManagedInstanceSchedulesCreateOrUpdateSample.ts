// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the managed instance's Start/Stop schedule.
 *
 * @summary creates or updates the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleCreateOrUpdateMax.json
 */
async function createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithAllOptionalParametersSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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
async function createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithNoOptionalParametersSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
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

async function main(): Promise<void> {
  await createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithAllOptionalParametersSpecified();
  await createsOrUpdatesTheManagedInstanceStartOrStopScheduleWithNoOptionalParametersSpecified();
}

main().catch(console.error);
