// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the managed instance's Start/Stop schedule.
 *
 * @summary Gets the managed instance's Start/Stop schedule.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/StartStopManagedInstanceScheduleGet.json
 */
async function getsTheManagedInstanceStartOrStopSchedule() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "schedulerg";
  const managedInstanceName = "schedulemi";
  const startStopScheduleName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.get(
    resourceGroupName,
    managedInstanceName,
    startStopScheduleName,
  );
  console.log(result);
}

async function main() {
  await getsTheManagedInstanceStartOrStopSchedule();
}

main().catch(console.error);
