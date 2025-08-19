// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the managed instance's Start/Stop schedule.
 *
 * @summary Deletes the managed instance's Start/Stop schedule.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/StartStopManagedInstanceScheduleDelete.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletesTheManagedInstanceStartOrStopSchedule(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "schedulerg";
  const managedInstanceName = "schedulemi";
  const startStopScheduleName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.startStopManagedInstanceSchedules.delete(
    resourceGroupName,
    managedInstanceName,
    startStopScheduleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesTheManagedInstanceStartOrStopSchedule();
}

main().catch(console.error);
