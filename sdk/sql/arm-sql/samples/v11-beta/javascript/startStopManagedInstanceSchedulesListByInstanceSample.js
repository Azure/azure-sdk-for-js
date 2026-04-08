// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the managed instance's Start/Stop schedules.
 *
 * @summary lists the managed instance's Start/Stop schedules.
 * x-ms-original-file: 2025-02-01-preview/StartStopManagedInstanceScheduleList.json
 */
async function listsTheManagedInstanceStartOrStopSchedules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.startStopManagedInstanceSchedules.listByInstance(
    "schedulerg",
    "schedulemi",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheManagedInstanceStartOrStopSchedules();
}

main().catch(console.error);
