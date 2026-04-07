// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the managed instance's Start/Stop schedule.
 *
 * @summary gets the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleGet.json
 */
async function getsTheManagedInstanceStartOrStopSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.get(
    "schedulerg",
    "schedulemi",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheManagedInstanceStartOrStopSchedule();
}

main().catch(console.error);
