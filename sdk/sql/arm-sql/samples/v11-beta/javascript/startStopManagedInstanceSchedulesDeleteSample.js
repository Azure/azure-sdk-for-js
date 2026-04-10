// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the managed instance's Start/Stop schedule.
 *
 * @summary deletes the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleDelete.json
 */
async function deletesTheManagedInstanceStartOrStopSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.startStopManagedInstanceSchedules.delete("schedulerg", "schedulemi", "default");
}

async function main() {
  await deletesTheManagedInstanceStartOrStopSchedule();
}

main().catch(console.error);
