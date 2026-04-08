// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the managed instance's Start/Stop schedule.
 *
 * @summary gets the managed instance's Start/Stop schedule.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleGet.json
 */
async function getsTheManagedInstanceStartOrStopSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.get(
    "schedulerg",
    "schedulemi",
    "default",
  );
  console.log(result);
}

async function main() {
  await getsTheManagedInstanceStartOrStopSchedule();
}

main().catch(console.error);
