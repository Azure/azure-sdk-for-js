// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running.
 *
 * @summary The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/ServiceTasks_Delete.json
 */
async function tasksDelete(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const taskName = "DmsSdkTask";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.serviceTasks.delete(
    groupName,
    serviceName,
    taskName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksDelete();
}

main().catch(console.error);
